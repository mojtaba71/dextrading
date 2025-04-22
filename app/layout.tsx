import "normalize.css/normalize.css";
import { Inter } from "next/font/google";
import "./globals.scss";
import Providers from "@/providers";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/Footer";
import Script from "next/script";
import TabLimit from "@/components/layout/TabLimit";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Clarity from '@microsoft/clarity';



const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  {
    ssr: false,
  }
);

const Header = dynamic(() => import("@/components/layout/Header"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DexTrading",
  description: "Unlock advanced crypto trading insights with DexTrading.",
  openGraph: {
    title: "DexTrading",
    description: "Unlock advanced crypto trading insights with DexTrading.",
    images: [
      {
        url: "/metatag.png",
        width: 1912,
        height: 907,
        alt: "DexTrading",
      },
    ],
  },
  icons: {
    icon: "/icon/favicon-32x32.png",
    apple: `${process.env.NEXT_PUBLIC_BASE_URL_SEVEN}/icon/apple-touch-icon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projectId = "mik57uafy0";

  Clarity.init(projectId);

  return (
    <html lang="en">
      <body className={cn(inter.className, "relative w-full")}>
        <Providers>
          <div className="flex">
            <Header />
            <ToastContainer position="top-center" />
            <main className="w-full md:w-[calc(100%-64px)]">
              <TabLimit
                appContent={
                  <div className="my-[2rem] lg:mt-12 max-w-screen-2xl min-h-96 !mx-auto">
                    {children}
                  </div>
                }
              ></TabLimit>

              <Footer />
            </main>
          </div>
        </Providers>
      </body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-EQXQQ1Z402" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EQXQQ1Z402');
        `}
      </Script>
      <Script id="clarity-script">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "mik57uafy0");
        `}
      </Script>
      <Script id="fresh-local-storage">
        {`
    (function(){ 
      console.log('checking local storage')
      // Check if the date exists in localStorage
      const cleanupDate = localStorage.getItem('cleanupDate');
      const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

      if (!cleanupDate) {
        // If date is absent, clear localStorage and set the new date
        localStorage.clear();
        localStorage.setItem('cleanupDate', today);
        console.log('LocalStorage was cleared and new date was set.');
      } else {
        // If date exists, log that no cleanup was needed
        console.log('No cleanup needed. Date exists in LocalStorage.');
      }
    })(); 
  `}
      </Script>
    </html>
  );
}
