import { getTokenDescription, searchToken } from "@/services/http/token.http";
import { Metadata } from "next";
import TokenPage from "@/components/features/token/TokenPage";
import { formatNumberToSubscript } from "@/utils/PriceFormatter";
import TokenAccordion from "@/components/features/token/TokenAccordion";
import HiddenElementForSeo from "@/components/common/HiddenElementForSeo";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import HowToUse from "@/components/features/followed-wallets/HowToUse";
import { TOKEN_PAGE_PARAMS } from "@/utils/pageParams";
import { minifyContract } from "@/utils/truncate";

interface Props {
  params: IParam;
  searchParams: searchParams;
}

type IParam = {
  params: [string, string];
};

type searchParams = {
  network: string;
};

// Helper function to generate a dynamic alt text using simple language
function generateAltText(
  tokenName: string,
  dexPlatform: string,
  blockchain: string,
  tokenPrice: string,
  formattedPriceChange: string,
  tokenId: string,
  tokenAddress: string
): string {
  // Base paragraph with dynamic details in a simple style
  const baseParagraph = `The token ${tokenName} is trading at a price of $${tokenPrice}. You can buy and sell it on the ${dexPlatform} platform. It is also being listed with the address ${tokenAddress} on the ${dexPlatform} trading exchange. This token is on the ${blockchain} network and is deployed on a decentralized blockchain. The project behind ${tokenName} aims to enhance trading and freedom. Its price and chart are available on the trading platform. This decentralized finance token makes it easy for the community to grow and have an effect. ${tokenName} has a price change of ${formattedPriceChange} in the last 24 hours and is known by the id ${tokenId}.`;

  // Simple filler text using plain language
  const simpleFiller = `This token is easy to understand and use. Many people trade it every day. The market is simple and friendly. You can quickly buy and sell the token without any trouble. The design of the platform is clear, and the price information is easy to read. People like to use the token because it is safe and secure. It is built with a simple idea in mind: to make trading fun and free. The technology behind the token is made for everyone. The trading experience is straightforward and fair. Every trade is recorded on the blockchain, so all the information is clear. The token shows a steady price on the chart. You can check the price anytime on the trading platform. The exchange works fast, and you can see every update as it happens. The network is strong and reliable. It makes the trading process smooth and simple. Many new users join every day because the system is easy to learn. The token is a good example of decentralized finance. It helps the community grow and supports freedom in trading. The people who use the token feel that they are part of something simple and honest. Every transaction is safe, and all the details are visible. The token makes it easy to be part of the market. With clear instructions and a friendly design, even beginners can trade without fear. The simple words on the website show how to buy, sell, and check the price.`;

  // Replace generic phrases with the dynamic tokenName for enriched context
  const enrichedFiller = simpleFiller
    .replace(/this token/gi, tokenName)
    .replace(/the token/gi, tokenName);

  // Combine the base paragraph and enriched filler text
  return `${baseParagraph} ${enrichedFiller}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // Fetch token details
    const data = await searchToken({
      params: {
        currencyAddress: params.params[1],
      },
    });

    const tokenData = data?.data?.[0];

    // Extract token information
    const tokenName = tokenData?.attributes?.name || "Unknown Token";
    const shortTokenName = tokenName.trim().split("/")[0];
    const tokenPrice = parseFloat(
      tokenData?.attributes?.base_token_price_usd || "0"
    ).toFixed(15);
    const dexPlatform =
      tokenData?.relationships?.dex?.data?.id || "unknown platform";
    const tokenId = tokenData?.id || "N/A";
    const blockchain = tokenId.split("_")[0] || "unknown blockchain";
    const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/tokens/${params.params[0]}/${params.params[1]}`;

    // Get the 24h price change percentage
    const priceChange24h =
      tokenData?.attributes?.price_change_percentage?.h24 || "0";
    const formattedPriceChange = parseFloat(priceChange24h).toFixed(2) + "%";

    // Get the image from imageUrl2 if available; otherwise, use the fallback image.
    let imageUrl =
      tokenData?.imageUrl2 ||
      `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/Shot_Token.jpg`;
    if (imageUrl.startsWith("/")) {
      imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}${imageUrl}`;
    }

    // Generate a 500-word alt text dynamically with simple language
    const altText = generateAltText(
      tokenName,
      dexPlatform,
      blockchain,
      tokenPrice,
      formattedPriceChange,
      tokenId,
      params.params[1] // token address
    );

    // Define SEO-friendly metadata
    const title = `${shortTokenName} Token | $${formatNumberToSubscript(
      +tokenPrice
    )} | ${blockchain} DEX Trading ${dexPlatform}`;

    const description = `${shortTokenName} on ${dexPlatform} (${blockchain}) is trading at $${tokenPrice} with a price change of ${formattedPriceChange}. Access chart analysis, trade activity, and top dextraders.`;

    return {
      title,
      description,
      keywords: `${tokenName.toLowerCase()}, ${tokenName} live price, ${blockchain} DEX trading, ${dexPlatform}, live chart analysis, price prediction, how to buy ${tokenName}, liquidity analysis, scoring system, security checker, holder analysis`,
      alternates: {
        canonical: pageUrl,
        languages: {
          "en-US": pageUrl,
        },
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: pageUrl,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: altText,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@dextrading",
        creator: "@dextrading",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    // Fallback metadata for errors with a static enriched alt text
    return {
      title: "dex trading | Explore Crypto Tokens",
      description:
        "Discover real-time crypto insights with dex trading. Explore token prices, liquidity, and scores with advanced analytics.",
      keywords:
        "dex trading, crypto insights, cryptocurrency, token analysis, blockchain",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}`,
      },
      openGraph: {
        title: "dex trading | Explore Crypto Tokens",
        description:
          "Discover real-time crypto insights with dex trading. Explore token prices, liquidity, and scores with advanced analytics.",
        type: "website",
        url: `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}`,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/Shot_Token.jpg`,
            width: 1200,
            height: 630,
            alt: "Dex Trading offers comprehensive cryptocurrency insights including live token prices, dynamic chart analysis, and in-depth market trends. Discover secure decentralized trading with robust liquidity analysis, advanced analytics, and community-driven projects on a reliable blockchain network.",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@dextrading",
        title: "dex trading | Explore Crypto Tokens",
        description:
          "Discover real-time crypto insights with dex trading. Explore token prices, liquidity, and scores with advanced analytics.",
        images: [`${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/Shot_Token.jpg`],
      },
    };
  }
}

export default async function Token({ params }: Props) {
  const searchedToken = await searchToken({
    params: {
      currencyAddress: params.params[1],
    },
  });

  const tokenDescription = await getTokenDescription(params.params[1]);

  return (
    <div>
      <Breadcrumb className="mt-12 mb-4">
        <BreadcrumbList>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <BreadcrumbLink
            href={`/tokens/${params.params[TOKEN_PAGE_PARAMS.NETWORK]}/${
              params.params[TOKEN_PAGE_PARAMS.CONTRACT_ADDRESS]
            }`}
          >
            {minifyContract(params.params[TOKEN_PAGE_PARAMS.CONTRACT_ADDRESS])}
          </BreadcrumbLink>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-lg md:text-xl">
        ${searchedToken.data?.[0].attributes?.name?.split("/")[0].toUpperCase()}{" "}
        DEX – Live {params.params[TOKEN_PAGE_PARAMS.NETWORK].toUpperCase()}{" "}
        Market Data
      </h1>
      <TokenPage params={params} token={searchedToken} />

      {tokenDescription &&
        tokenDescription.data &&
        tokenDescription.data.data && (
          <>
            <TokenAccordion
              tokenImageUrl={
                searchedToken.data?.[0].seoImageUrl ??
                `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/Shot_Token.jpg`
              }
              tokenDescription={tokenDescription.data.data.content}
            />
            <HiddenElementForSeo>
              <div>{tokenDescription.data.data.content}</div>
            </HiddenElementForSeo>
          </>
        )}
      <HowToUse />
    </div>
  );
}
