import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "../../../context/AppContext";
import MenuControl from "./MenuControl";
import Cookies from 'js-cookie';

export default function MobileMenu({ scroll }) {
  const { state = {}, dispatch = () => { } } = useAppContext() || {};
  const handleChangeLanguage = (e) => {
    dispatch({ type: "LANG", payload: e });
    window.location.reload();
  };
  const pathname = usePathname();
  const isActive = (path) => {
    return pathname === path ? "active" : "";
  };
  const newArrivals = Cookies.get("has_items_NEW_ARRIVAL");
  const clearance = Cookies.get("has_items_CLEARANCE");
  const commingSoon = Cookies.get("has_items_COMMING_SOON");
  const giveaway = Cookies.get("has_items_GIVEAWAY");
  return (
    <>
      <div className="mobile-menu fix mb-3 mean-container">
        <div className="mean-bar">
          <Link
            href="/#nav"
            className="meanmenu-reveal"
            style={{ right: 0, left: "auto", display: "inline" }}
          >
            <span>
              <span>
                <span />
              </span>
            </span>
          </Link>
          {
            scroll && isActive("/") ? (
              <ul className="mobile-menu-links">
                <li className={isActive("/new-arrival")}>
                  <Link href="#new-arrival" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent" aria-current="page">
                    أحدث المنتجات
                  </Link>
                </li>
                <li className={isActive("/giveaway")}>
                  <Link href="#giveaway" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent">
                    أبرز العروض
                  </Link>
                </li>
                <li className={isActive("/comming-soon")}>
                  <Link href="#comming-soon" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent">
                    قريباً في المتجر
                  </Link>
                </li>
                <li className={isActive("/clearance")}>
                  <Link href="#clearance" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent">
                    عروض التصفية
                  </Link>
                </li>
              </ul>

            ) : (
              <ul className="mobile-menu-links">
                <li className={isActive("/")}>
                  <Link href="/" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent" aria-current="page">الرئيسية</Link>
                </li>
                <li className={isActive("/products")}>
                  <Link href="/products" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent">جميع المنتجات</Link>
                </li>
                <li className={isActive("/brands")}>
                  <Link href="/brands" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent">العلامات التجارية</Link>
                </li>
              </ul>
            )
          }
          <hr />
          <MenuControl />
        </div>
      </div>
    </>
  );
}
