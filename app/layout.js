"use client"
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Offcanvas from "@/components/ui/Offcanvas";
import AppProvider from "../context/AppContext";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Cookies from "js-cookie";
import "./globals.scss";
import ContactTools from "@/components/ui/ContactTools";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const [lang, setLang] = useState(Cookies?.get("lang"));
  const [scroll, setScroll] = useState(0);
  const [isOffCanvas, setOffCanvas] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const pathname = usePathname();
  const analyticsInsertedRef = useRef(false);

  const isAuthPage = pathname === "/" || pathname === "/register" || pathname === '/reset-password' || pathname === '/forget-password';

  const handleOffCanvas = () => setOffCanvas(!isOffCanvas);
  const handleSearch = () => setSearch(!isSearch);

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({ live: false });
    window.wow.init();

    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      setScroll((current) => (current === scrollCheck ? current : scrollCheck));
    });

    if (Cookies?.get("lang")) {
      document.documentElement.setAttribute(
        "dir",
        Cookies?.get("lang") === "EN" ? "ltr" : "rtl"
      );
      document.documentElement.setAttribute(
        "lang",
        Cookies?.get("lang") || "AR"
      );
    }

    if (!analyticsInsertedRef.current) {
      analyticsInsertedRef.current = true;
      const siteLocation = Cookies.get("siteLocation");
      const analyticsId =
        siteLocation === "primereach" ? "G-HFR3DPYGR5" : "G-TE73NGSFDB";

      if (!document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${analyticsId}"]`)) {
        const externalScript = document.createElement("script");
        externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
        externalScript.async = true;
        document.head.appendChild(externalScript);
      }

      const inlineScript = document.createElement("script");
      inlineScript.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analyticsId}');
            `;
      document.head.appendChild(inlineScript);
    }

    if (!document.getElementById("hotjar-script")) {
      const hotjarScript = document.createElement("script");
      hotjarScript.id = "hotjar-script";
      hotjarScript.innerHTML = `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:6513872,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `;
      document.head.appendChild(hotjarScript);
    }
  }, []);

  return (
    <ReactQueryProvider>
      <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
        <head>
          {/* Hotjar Tracking */}
        </head>
        <body
          className={`antialiased ${!isAuthPage ? "header-padding" : ""}`}
        >
          <div id="media-popup"></div>
          <Toaster position={"top-left"} toastOptions={{ duration: 1000 }} />
          <AppProvider>
            {!isAuthPage && (
              <>
                <Offcanvas
                  isOffCanvas={isOffCanvas}
                  handleOffCanvas={handleOffCanvas}
                  scroll={scroll}
                />
                <Header
                  scroll={scroll}
                  isOffCanvas={isOffCanvas}
                  handleOffCanvas={handleOffCanvas}
                  isSearch={isSearch}
                  handleSearch={handleSearch}
                />
              </>
            )}

            {children}
            {!isAuthPage && <Footer />}
            {!isAuthPage && <ContactTools />}
          </AppProvider>
        </body>
      </html >
    </ReactQueryProvider >
  );
}
