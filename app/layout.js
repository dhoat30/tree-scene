//import css file
import "./globals.scss";
import "./tokens.css";
import "leaflet/dist/leaflet.css";

// Import slick css files

import { Work_Sans } from "next/font/google";
import ClientProvider from "@/components/Providers/ClientProvider";
import Script from "next/script";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
// fonts settings

const work_sans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  preload: true,
});

export const metadata = {
  metadataBase: new URL("https://treescene.co.nz"),
  title: {
    default: "Tree Scene Tauranga | Professional Tree Services",
    template: "%s | Tree Scene Tauranga",
  },
  description:
    "Professional tree removal, pruning, stump grinding and land clearing in Tauranga, Bay of Plenty. Licensed arborists available 24/7.",
  openGraph: {
    siteName: "Tree Scene Tauranga",
    type: "website",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  const GTM_ID = "GTM-5FNFX47G";

  return (
    <html lang="en" className={`${work_sans.variable}`}>
      <Script
        id="gtm-script"
        strategy="lazyOnload" // or "lazyOnload" if you prefer
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s);j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
        }}
      />
      <body>
        {/* 3) GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            loading="lazy"
          />
        </noscript>
        <AppRouterCacheProvider>
          <ClientProvider>{children}</ClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
