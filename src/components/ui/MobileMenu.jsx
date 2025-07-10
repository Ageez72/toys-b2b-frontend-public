"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "../../../context/AppContext";
import MenuControl from "./MenuControl";
import Cookies from 'js-cookie';
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";

export default function MobileMenu({ scroll, onGoTo }) {
  const { state = {}, dispatch = () => {} } = useAppContext() || {};
  const [lang, setLang] = useState("AR"); // fallback
  const [cookiesState, setCookiesState] = useState({
    newArrivals: false,
    clearance: false,
    commingSoon: false,
    giveaway: false,
  });

  useEffect(() => {
    setLang(state.LANG || "AR"); // or read from cookie if needed
    setCookiesState({
      newArrivals: Cookies.get("has_items_NEW_ARRIVAL") === "true",
      clearance: Cookies.get("has_items_CLEARANCE") === "true",
      commingSoon: Cookies.get("has_items_COMING_SOON") === "true",
      giveaway: Cookies.get("has_items_GIVEAWAY") === "true",
    });
  }, [state.LANG]);

  const translation = lang === "EN" ? en : ar;
  const pathname = usePathname();
  const isActive = (path) => pathname === path ? "active" : "";

  const handleChangeLanguage = (e) => {
    dispatch({ type: "LANG", payload: e });
    window.location.reload(); // this is fine for now
  };

  return (
    <div className="mobile-menu fix mb-3 mean-container">
      <div className="mean-bar">
        <Link
          href="/#nav"
          className="meanmenu-reveal"
          style={{ right: 0, left: "auto", display: "inline" }}
        >
          <span><span><span /></span></span>
        </Link>

        {scroll && isActive("/home") ? (
          <ul className="mobile-menu-links">
            {cookiesState.newArrivals && (
              <li className={isActive("/new-arrival")} onClick={() => onGoTo()}>
                <Link href="#new-arrival">{translation.newArrivals}</Link>
              </li>
            )}
            {cookiesState.giveaway && (
              <li className={isActive("/giveaway")} onClick={() => onGoTo()}>
                <Link href="#giveaway">{translation.offers}</Link>
              </li>
            )}
            {cookiesState.commingSoon && (
              <li className={isActive("/comming-soon")} onClick={() => onGoTo()}>
                <Link href="#comming-soon">{translation.commingSoon}</Link>
              </li>
            )}
            {cookiesState.clearance && (
              <li className={isActive("/clearance")} onClick={() => onGoTo()}>
                <Link href="#clearance">{translation.clearance}</Link>
              </li>
            )}
          </ul>
        ) : (
          <ul className="mobile-menu-links">
            <li className={isActive("/home")} onClick={() => onGoTo()}>
              <Link href="/home">{translation.home}</Link>
            </li>
            <li className={isActive("/products")} onClick={() => onGoTo()}>
              <Link href="/products?itemStatus=AVAILABLE">{translation.allProducts}</Link>
            </li>
            <li className={isActive("/brands")} onClick={() => onGoTo()}>
              <Link href="/brands">{translation.brands}</Link>
            </li>
          </ul>
        )}

        <hr />
        <MenuControl onGoTo={onGoTo}/>
      </div>
    </div>
  );
}