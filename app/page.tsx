import { getTopNFTs } from "@/services/http/nft.http";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Dextrading | Top Dex Trading Insights and Wallet Trading",
  description:
    "Dextrading is ultimate DEX trading platform with advanced analytics. Master decentralized exchange (DEX) trading, track smart dextrader, copy strategies on DEX",
  keywords:
    "Dex trading, Decentralized Exchange, DEX trading, DEX trading platform, DEX trading app, Solana wallet trading, Solana Dex trading, top Solana memes, best Solana memes, meme finder, gem finder, 100x tokens, wallet trading, token security, smart money tracking, Solana projects, Ethereum projects, Base network, Arbitrum tokens, Optimism projects, TON trading, Tron trading, decentralized exchange, wallet statement, Decentralized Exchange (DEX) trading insights, portfolio tracking, decentralized trading insights, best performance wallets, smart money finding, tomorrow's top gainers, copy traders, best projects to trade",
  robots: "index, follow",
  twitter: {
    card: "summary_large_image",
    site: "@dextrading",
    title: "Dextrading | Find Tomorrow's Top Gainers Today",
    description:
      "Dextrading: Find meme tokens, gem tokens, Solana wallet trading, Solana Dex trading, and top Solana memes. Use our DEX trading platform and app for secure Decentralized Exchange (DEX) trading, wallet analysis, and decentralized exchange insights for top networks like Solana, Ethereum, and more.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/DEX_Trading.png`,
        width: 1200,
        height: 630,
        alt: "Dextrading platform for secure DEX trading, Solana trading, and top token insights.",
      },
    ],
  },
  openGraph: {
    title: "Dextrading | Top Dex Trading Insights and Wallet Trading",
    description:
      "Dextrading platform is your ultimate gateway to mastering dex trading, uncovering market gems, excelling in Decentralized Exchange (DEX) trading, and analyzing dex trading financial statements. Dive into the world of meme tokens, gem tokens, and top-performing assets while exploring the next 100x growth opportunities in DEX trading. With our cutting-edge platform and app, track the best-performing wallets, follow smart money traders, and discover lucrative trading opportunities across Ethereum, Base, Arbitrum, Optimism, TON, Tron, and Solana. Gain an edge with actionable insights, portfolio tracking, and token security checks. Copy strategies from expert DEX traders, analyze top wallets, and stay ahead in the decentralized trading revolution. Discover tomorrow's market leaders today with Dextrading.",
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL_SEVEN,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/DEX_Trading.png`,
        width: 1200,
        height: 630,
        alt: "Dextrading platform insights for DEX trading, wallet tracking, and Solana trading.",
      },
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL_SEVEN,
  },
  authors: [
    {
      name: "Dextrading Team",
    },
  ],
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/favicon.ico`,
    apple: `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/icon/apple-touch-icon.png`
  },
};

export default async function Home() {
  try {
    const nfts = await getTopNFTs();

    return (
      <div className="w-full">
        <Head>
          <meta
            name="ahrefs-site-verification"
            content="e0126c4c482c36a1009f59bdf25461160da3e532ae99fd5c060b217818d6f886"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icon/favicon-16x16.png"
          />
          <link rel="manifest" href="/icon/site.webmanifest" />
          <script id="clarity-script" type="text/javascript">
            {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]function(){(c[a].q=c[a].q[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "mik57uafy0");`}
          </script>
        </Head>
        
      </div>
    );
  } catch (error) {
    return <div>Failed to load data, please try again.</div>;
  }
}
