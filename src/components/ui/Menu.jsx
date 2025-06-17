import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from 'js-cookie';

export default function Menu({ scroll }) {
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
      {
        scroll && isActive("/") ? (
          <ul className="menu-list font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8  md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
            {
              newArrivals === 'true' && (
                <li className={isActive("/new-arrival")}>
                  <Link href="#new-arrival" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent" aria-current="page">
                    أحدث المنتجات
                  </Link>
                </li>
              )
            }
            {
              giveaway === 'true' && (
                <li className={isActive("/giveaway")}>
                  <Link href="#giveaway" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent">
                    أبرز العروض
                  </Link>
                </li>
              )
            }
            {
              commingSoon === 'true' && (
                <li className={isActive("/comming-soon")}>
                  <Link href="#comming-soon" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent">
                    قريباً في المتجر
                  </Link>
                </li>
              )
            }
            {
              clearance === 'true' && (
                <li className={isActive("/clearance")}>
                  <Link href="#clearance" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent">
                    عروض التصفية
                  </Link>
                </li>
              )
            }
          </ul>
        ) : (
          <ul className="menu-list font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8  md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
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
    </>
  );
}
