import { useEffect, useRef, useState } from "react";
import {
  ChartingLibraryWidgetOptions,
  IBasicDataFeed,
  IDatafeedQuotesApi,
  ISymbolValueFormatter,
  LibrarySymbolInfo,
  ResolutionString,
  widget as TradingViewWidget,
} from "@/public/static/charting_library";
import { IDatafeed, IOhlcvData } from "@/types/datafeed.type";
import { usePathname } from "next/navigation";
import { searchToken, getDataFeed } from "@/services/http/token.http";
import { useDebounce } from "use-debounce";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const chartResolutions = [
  "10", "15", "30", "60", "240", "480", "720", "1440", "3D", "W", "M",
] as ResolutionString[];

// TradingView گاهی "D"/"1D" و "1W"/"1M" هم می‌فرسته — همه رو map می‌کنیم
const chartSecondsPerResolution: Record<string, number> = {
  "10":   10 * 60,
  "15":   15 * 60,
  "30":   30 * 60,
  "60":   60 * 60,
  "240":  240 * 60,
  "480":  480 * 60,
  "720":  720 * 60,
  "1440": 24 * 60 * 60,
  "D":    24 * 60 * 60,
  "1D":   24 * 60 * 60,
  "3D":   3 * 24 * 60 * 60,
  "W":    7 * 24 * 60 * 60,
  "1W":   7 * 24 * 60 * 60,
  "M":    30 * 24 * 60 * 60,
  "1M":   30 * 24 * 60 * 60,
};

function aggregateBars(rawBars: IOhlcvData[], resolution: string): IOhlcvData[] {
  const intervalSec = chartSecondsPerResolution[resolution] || 300;
  const buckets = new Map<number, IOhlcvData>();

  for (const bar of rawBars) {
    const bucketTime = Math.floor(bar.time / intervalSec) * intervalSec;
    if (!buckets.has(bucketTime)) {
      buckets.set(bucketTime, { ...bar, time: bucketTime });
    } else {
      const agg = buckets.get(bucketTime)!;
      agg.high = Math.max(agg.high, bar.high);
      agg.low = Math.min(agg.low, bar.low);
      agg.close = bar.close;
      agg.volume += bar.volume;
    }
  }

  return Array.from(buckets.values()).sort((a, b) => a.time - b.time);
}

function getOhlcvFromFeed(feed: IDatafeed): IOhlcvData[] {
  if (!feed.data) return [];
  return feed.data.attributes.ohlcv_list
    .map((item) => ({
      time: item[0],
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
      volume: item[5],
    }))
    .sort((a, b) => a.time - b.time);
}

// merge سه dataset با اولویت: day > hour > minute برای timestamp های مشترک
function mergeOhlcv(
  minuteData: IOhlcvData[],
  hourData: IOhlcvData[],
  dayData: IOhlcvData[]
): IOhlcvData[] {
  const merged: IOhlcvData[] = [];
  let i = 0, j = 0, k = 0;

  while (i < minuteData.length || j < hourData.length || k < dayData.length) {
    const tMin = i < minuteData.length ? minuteData[i].time : Infinity;
    const tHour = j < hourData.length ? hourData[j].time : Infinity;
    const tDay = k < dayData.length ? dayData[k].time : Infinity;
    const minT = Math.min(tMin, tHour, tDay);

    if (tMin === minT && tHour === minT && tDay === minT) {
      merged.push(dayData[k++]); i++; j++;
    } else if (tHour === minT && tMin === minT) {
      merged.push(hourData[j++]); i++;
    } else if (tDay === minT && tHour === minT) {
      merged.push(dayData[k++]); j++;
    } else if (tDay === minT) {
      merged.push(dayData[k++]);
    } else if (tHour === minT) {
      merged.push(hourData[j++]);
    } else {
      merged.push(minuteData[i++]);
    }
  }

  return merged;
}

// برای توکن‌های compare: 3 API call موازی + merge برای پوشش کامل تاریخچه
async function fetchFullOhlcv(address: string, network: string): Promise<{ data: IOhlcvData[]; meta: IDatafeed["meta"] | null }> {
  const [dayFeed, hourFeed, minuteFeed] = await Promise.all([
    getDataFeed({ params: { contractAddress: address, network, timeframe: "day", aggregate: 1 } }),
    getDataFeed({ params: { contractAddress: address, network, timeframe: "hour", aggregate: 1 } }),
    getDataFeed({ params: { contractAddress: address, network, timeframe: "minute", aggregate: 5 } }),
  ]);

  const dayData = getOhlcvFromFeed(dayFeed);
  const hourData = getOhlcvFromFeed(hourFeed);
  const minuteData = getOhlcvFromFeed(minuteFeed);

  return {
    data: mergeOhlcv(minuteData, hourData, dayData),
    meta: dayFeed.meta ?? hourFeed.meta ?? minuteFeed.meta ?? null,
  };
}

// ─── فرمت قیمت با نماد subscript برای قیمت‌های خیلی کوچیک ─────────────────
// مثال: 0.000000942 → "0.0₆942"
const SUBSCRIPT_DIGITS: Record<string, string> = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
  "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
};

function toSubscript(n: number): string {
  return String(n).split("").map((c) => SUBSCRIPT_DIGITS[c] ?? c).join("");
}

function formatCryptoPrice(price: number, signPositive?: boolean): string {
  if (!isFinite(price) || isNaN(price)) return "0";

  const sign = signPositive && price > 0 ? "+" : "";
  const isNegative = price < 0;
  const negSign = isNegative ? "-" : "";
  const absPrice = Math.abs(price);

  if (absPrice === 0) return `${sign}0`;

  if (absPrice >= 0.001) {
    let decimals: number;
    if (absPrice >= 1000) decimals = 2;
    else if (absPrice >= 1) decimals = 4;
    else if (absPrice >= 0.1) decimals = 5;
    else decimals = 6;
    return `${sign}${negSign}${absPrice.toFixed(decimals).replace(/\.?0+$/, "")}`;
  }

  const fixedStr = absPrice.toFixed(20);
  const afterDecimal = fixedStr.split(".")[1] ?? "";
  let leadingZeros = 0;
  for (const ch of afterDecimal) {
    if (ch === "0") leadingZeros++;
    else break;
  }

  const sigDigits = afterDecimal.slice(leadingZeros, leadingZeros + 4).replace(/0+$/, "");
  const significandRaw = sigDigits || "0";

  if (leadingZeros > 3) {
    return `${sign}${negSign}0.0${toSubscript(leadingZeros)}${significandRaw}`;
  }

  return `${sign}${negSign}${absPrice.toFixed(leadingZeros + 4).replace(/\.?0+$/, "")}`;
}

function createCryptoPriceFormatter(): ISymbolValueFormatter {
  return {
    format(price: number, signPositive?: boolean): string {
      return formatCryptoPrice(price, signPositive);
    },
    formatChange(currentPrice: number, prevPrice: number, signPositive?: boolean): string {
      return formatCryptoPrice(currentPrice - prevPrice, signPositive ?? true);
    },
  };
}

// فرمت ticker برای compare: "poolName / network / address"
function buildCompareTicker(poolName: string, network: string, address: string): string {
  return `${poolName.trim()} / ${network} / ${address}`;
}

// اگه ticker فرمت compare داشته باشه، آخرین دو بخش رو address و network برمی‌گردونه
// این روش با نام‌های پیچیده مثل "BIBI / WBNB / bsc / 0xABC" هم کار می‌کنه
function parseCompareTicker(ticker: string): { address: string; network: string } | null {
  if (!ticker?.trim()) return null;
  const parts = ticker.split(" / ").map((p) => p.trim());
  if (parts.length >= 3) {
    const address = parts[parts.length - 1];
    const network = parts[parts.length - 2];
    if (address && address.length >= 8 && network) {
      return { address, network };
    }
  }
  return null;
}

interface CompareResult {
  poolAddress: string;
  network: string;
  poolName: string;
  ticker: string;
  imageUrl?: string;
  priceUsd?: string;
}

function CompareModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (result: CompareResult) => void;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 400);
  const [results, setResults] = useState<CompareResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<CompareResult | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      setResults([]);
      setDropdownOpen(false);
      return;
    }
    setLoading(true);
    searchToken({ params: { currencyAddress: debouncedQuery } })
      .then((result) => {
        const items = result?.data ?? [];
        const mapped: CompareResult[] = items
          .filter((r) => r.attributes?.address && r.id)
          .map((r) => {
            const underscoreIdx = r.id!.indexOf("_");
            const network = underscoreIdx > -1 ? r.id!.slice(0, underscoreIdx) : "eth";
            const poolAddress = r.attributes!.address!;
            return {
              poolAddress,
              network,
              poolName: r.attributes?.name ?? poolAddress,
              ticker: buildCompareTicker(r.attributes?.name ?? poolAddress, network, poolAddress),
              imageUrl: r.imageUrl ?? r.imageUrl2 ?? undefined,
              priceUsd: r.attributes?.base_token_price_usd,
            };
          });
        setResults(mapped);
        setDropdownOpen(mapped.length > 0);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    setSelected(null);
    setDropdownOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="p-0 w-[480px] max-w-[95vw] overflow-hidden rounded-2xl border-0 bg-[#1a1a2e] shadow-2xl">
        <div className="flex flex-col items-center pt-8 pb-4 px-8">
          <div className="flex items-center gap-2 mb-4">
            <Image src="/dextrading-logo.svg" alt="DexTrading" width={28} height={28} />
            <span className="text-white font-semibold text-lg">DexTrading</span>
          </div>
          <h2 className="text-white text-2xl font-bold">Compare</h2>
        </div>

        <div className="px-8 pb-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400 font-medium">Asset</label>
            <div className="relative">
              <div className="flex items-center bg-[#0f0f1e] rounded-xl border border-white/10 px-4 py-3 gap-2">
                {selected && (
                  <Avatar className="h-6 w-6 shrink-0">
                    <AvatarImage src={selected.imageUrl} alt={selected.poolName} />
                    <AvatarFallback className="text-[10px]">{selected.poolName.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <Input
                  autoFocus
                  placeholder="Select Token"
                  className="border-0 bg-transparent p-0 h-auto text-white placeholder:text-gray-500 focus-visible:ring-0 text-sm"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(null);
                  }}
                  onFocus={() => results.length > 0 && setDropdownOpen(true)}
                />
                <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4M8 15l4 4 4-4" />
                </svg>
              </div>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0f0f1e] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl max-h-52 overflow-y-auto">
                  {loading && <p className="px-4 py-3 text-sm text-gray-400">Searching...</p>}
                  {results.map((r) => (
                    <button
                      key={r.ticker}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
                      onClick={() => {
                        setSelected(r);
                        setQuery(r.poolName);
                        setDropdownOpen(false);
                      }}
                    >
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src={r.imageUrl} alt={r.poolName} />
                        <AvatarFallback className="text-xs bg-white/10 text-white">{r.poolName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-medium text-white truncate">{r.poolName}</span>
                        <span className="text-xs text-gray-400 uppercase">{r.network}</span>
                      </div>
                      {r.priceUsd && (
                        <span className="text-xs text-gray-400 shrink-0">
                          ${parseFloat(r.priceUsd).toPrecision(4)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400 font-medium">Exchange</label>
            <div className="flex items-center bg-[#0f0f1e] rounded-xl border border-white/10 px-4 py-3 gap-2">
              <Image src="/dextrading-logo.svg" alt="DexTrading" width={22} height={22} />
              <span className="text-sm text-white flex-1">DexTrading</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4M8 15l4 4 4-4" />
              </svg>
            </div>
          </div>

          <button
            onClick={() => { if (selected) { onSelect(selected); handleClose(); } }}
            disabled={!selected}
            className="w-full py-3.5 rounded-xl font-semibold text-white text-base transition-opacity disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #e91e63, #c2185b)" }}
          >
            Add
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  chartOptions: Partial<ChartingLibraryWidgetOptions>;
  minuteData: IOhlcvData[];
  hourData: IOhlcvData[];
  dayData: IOhlcvData[];
  className?: string;
  tokenDescription: string;
  tokenExchange: string;
  theme: "dark" | "light";
  customSymbols?: Array<{ symbol: string; full_name: string; description: string }>;
}

const DAILY_RESOLUTIONS = new Set(["1440", "D", "1D", "3D", "W", "1W", "M", "1M"]);

// کش داده compare — برای جلوگیری از fetch مجدد هنگام تغییر resolution
const compareBarsCache = new Map<string, IOhlcvData[]>();

const MyTradingView = ({
  chartOptions,
  minuteData,
  hourData,
  dayData,
  theme,
  tokenDescription,
  tokenExchange,
}: Props) => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const [chartIsReady, setChartIsReady] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const myWidget = useRef<any>();
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const dataFeed = (
    minuteData: IOhlcvData[],
    hourData: IOhlcvData[],
    dayData: IOhlcvData[],
    tokenExchange: string,
  ): IBasicDataFeed | (IBasicDataFeed & IDatafeedQuotesApi) => {
    const lastBar = dayData[dayData.length - 1] ?? minuteData[minuteData.length - 1];

    return {
      onReady: (callback) => {
        setTimeout(() => callback({ supported_resolutions: chartResolutions }), 0);
      },

      resolveSymbol: (symbolName, onSymbolResolvedCallback) => {
        setTimeout(() => {
          const parsed = parseCompareTicker(symbolName);
          const parts = symbolName.split(" / ");
          const name = parsed
            ? parts.slice(0, parts.length - 1).join(" / ")
            : symbolName;
          const description = parsed ? symbolName : `${symbolName} Dextrading.com`;

          onSymbolResolvedCallback({
            name,
            description,
            exchange: parsed ? "DEX" : tokenExchange,
            ticker: symbolName,
            timezone: "Etc/UTC",
            minmov: 1,
            session: "24x7",
            type: "crypto",
            pricescale: 100000000,
            listed_exchange: parsed ? "DEX" : tokenExchange,
            format: "price",
            has_intraday: true,
            has_seconds: false,
            has_ticks: false,
            has_weekly_and_monthly: true,
            has_daily: true,
            supported_resolutions: chartResolutions,
          });
        }, 0);
      },

      getBars: (symbolInfo, resolution, periodParams, onResult, onError) => {
        const ticker = symbolInfo.ticker ?? symbolInfo.description ?? symbolInfo.name ?? "";
        const parsed = parseCompareTicker(ticker);

        if (!parsed) {
          setTimeout(() => {
            // hour-based (≥60min): dayData قدیمی + hourData اخیر را ترکیب می‌کنیم
            // چون hourData فقط ~۸ روز تاریخچه دارد ولی dayData تا ~۱۰۰ روز دارد
            let sourceData: IOhlcvData[];
            if (DAILY_RESOLUTIONS.has(resolution)) {
              sourceData = dayData;
            } else if (parseInt(resolution) >= 60) {
              if (hourData.length > 0 && dayData.length > 0) {
                const hourStart = hourData[0].time;
                const historical = dayData.filter((b) => b.time < hourStart);
                sourceData = [...historical, ...hourData];
              } else {
                sourceData = hourData.length > 0 ? hourData : dayData;
              }
            } else {
              sourceData = minuteData.length > 0 ? minuteData : hourData;
            }

            const aggregated = aggregateBars(sourceData, resolution);
            const bars = aggregated
              .filter((bar) => bar.time >= periodParams.from && bar.time <= periodParams.to)
              .map((bar) => ({
                time: bar.time * 1000,
                open: bar.open,
                high: bar.high,
                low: bar.low,
                close: bar.close,
                volume: bar.volume,
              }));

            // noData=true فقط وقتی که بازه درخواستی کاملاً قبل از اولین bar ماست
            // در غیر این صورت TradingView gap ایجاد می‌کند
            const firstBarTime = aggregated.length > 0 ? aggregated[0].time : null;
            const noData = bars.length === 0 && (firstBarTime === null || periodParams.to < firstBarTime);
            onResult(bars, { noData });
          }, 50);
          return;
        }

        const { address, network } = parsed;
        const cacheKey = `${address}_${network}`;

        const serveFromCache = (rawBars: IOhlcvData[]) => {
          const aggregated = aggregateBars(rawBars, resolution);
          const bars = aggregated
            .filter((bar) => bar.time >= periodParams.from && bar.time <= periodParams.to)
            .map((bar) => ({
              time: bar.time * 1000,
              open: bar.open,
              high: bar.high,
              low: bar.low,
              close: bar.close,
              volume: bar.volume,
            }));
          const firstBarTime = aggregated.length > 0 ? aggregated[0].time : null;
          const noData = bars.length === 0 && (firstBarTime === null || periodParams.to < firstBarTime);
          setTimeout(() => onResult(bars, { noData }), 0);
        };

        const cached = compareBarsCache.get(cacheKey);
        if (cached) {
          serveFromCache(cached);
          return;
        }

        fetchFullOhlcv(address, network)
          .then(({ data }) => {
            compareBarsCache.set(cacheKey, data);
            serveFromCache(data);
          })
          .catch((err) => {
            setTimeout(() => onError(String(err)), 0);
          });
      },

      subscribeBars: (_symbolInfo, _resolution, onRealtimeCallback) => {
        if (!lastBar) return;
        intervalId.current = setInterval(() => {
          onRealtimeCallback({
            time: lastBar.time * 1000,
            open: lastBar.open,
            high: lastBar.high,
            low: lastBar.low,
            close: lastBar.close,
            volume: lastBar.volume,
          });
        }, 10000);
      },

      unsubscribeBars: () => {
        if (intervalId.current) clearInterval(intervalId.current);
      },

      searchSymbols: (userInput, _exchange, _symbolType, onResultReadyCallback) => {
        if (!userInput || userInput.trim().length < 2) {
          onResultReadyCallback([]);
          return;
        }
        searchToken({ params: { currencyAddress: userInput } })
          .then((result) => {
            const items = result?.data ?? [];
            const mapped = items
              .filter((r) => r.attributes?.address && r.id)
              .map((r) => {
                const underscoreIdx = r.id!.indexOf("_");
                const network = underscoreIdx > -1 ? r.id!.slice(0, underscoreIdx) : "eth";
                const poolAddress = r.attributes!.address!;
                const fullName = buildCompareTicker(r.attributes?.name ?? poolAddress, network, poolAddress);
                return {
                  symbol: r.attributes?.name ?? poolAddress,
                  full_name: fullName,
                  description: fullName,
                  exchange: "DEX",
                  ticker: fullName,
                  type: "crypto",
                };
              });
            onResultReadyCallback(mapped);
          })
          .catch(() => onResultReadyCallback([]));
      },
    };
  };

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: chartOptions.symbol || "DefaultSymbol",
      datafeed: dataFeed(minuteData, hourData, dayData, tokenExchange),
      interval: (chartOptions.interval as ResolutionString) || ("240" as ResolutionString),
      container: chartContainerRef.current,
      library_path: chartOptions.library_path,
      locale: "en",
      debug: false,
      disabled_features: ["use_localstorage_for_settings", "header_compare"],
      enabled_features: ["study_templates"],
      charts_storage_url: chartOptions.charts_storage_url,
      charts_storage_api_version: chartOptions.charts_storage_api_version,
      client_id: chartOptions.client_id,
      user_id: chartOptions.user_id,
      fullscreen: chartOptions.fullscreen,
      autosize: chartOptions.autosize,
      timezone: "Etc/UTC",
      theme: theme || "dark",
      header_widget_buttons_mode: "fullsize",
      custom_formatters: {
        priceFormatterFactory: (
          _symbolInfo: LibrarySymbolInfo | null,
          _minTick: string,
        ): ISymbolValueFormatter | null => {
          return createCryptoPriceFormatter();
        },
      },
    };

    myWidget.current = new TradingViewWidget(widgetOptions);

    myWidget.current.headerReady().then(() => {
      myWidget.current.createButton({
        align: "left",
        useTradingViewStyle: true,
        text: "Compare",
        title: "Compare with another token",
        onClick: () => setCompareOpen(true),
      });
    });

    return () => {
      myWidget.current?.remove();
    };
  }, [pathname]);

  useEffect(() => {
    if (myWidget.current) {
      myWidget.current.onChartReady(() => setChartIsReady(true));
    }
  }, [myWidget]);

  useEffect(() => {
    if (chartIsReady) myWidget.current.changeTheme(theme);
  }, [theme, chartIsReady]);

  useEffect(() => {
    if (chartIsReady) {
      myWidget.current._options.datafeed = dataFeed(minuteData, hourData, dayData, tokenExchange);
      myWidget.current.activeChart().resetData();
    }
  }, [minuteData, hourData, dayData, tokenExchange, chartIsReady]);

  const handleCompareSelect = async (result: CompareResult) => {
    if (!myWidget.current || !chartIsReady) return;

    // داده compare رو قبل از createStudy fetch و cache می‌کنیم
    // تا وقتی TradingView getBars صدا زد داده آماده باشه
    const cacheKey = `${result.poolAddress}_${result.network}`;
    if (!compareBarsCache.has(cacheKey)) {
      try {
        const { data } = await fetchFullOhlcv(result.poolAddress, result.network);
        compareBarsCache.set(cacheKey, data);
      } catch {
        // اگه fetch شکست خورد، TradingView خودش getBars می‌زنه
      }
    }

    myWidget.current.activeChart().createStudy(
      "Compare",
      false,
      false,
      { symbol: result.ticker },
      undefined,
      { priceScale: "new-left" },
    );
  };

  return (
    <>
      <div ref={chartContainerRef} className="TVChartContainer" />
      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        onSelect={handleCompareSelect}
      />
    </>
  );
};

export default MyTradingView;
