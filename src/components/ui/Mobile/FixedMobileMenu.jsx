import React from 'react'
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import en from "../../../../locales/en.json";
import ar from "../../../../locales/ar.json";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { getProfile } from '@/actions/utils';

export default function FixedMobileMenu() {
    const { state = {}, dispatch = () => { } } = useAppContext() || {};
    const cartLength = state?.STOREDITEMS?.length || 0;
    const [translation, setTranslation] = useState(ar);
    useEffect(() => {
        setTranslation(state.LANG === "EN" ? en : ar);
    }, [state.LANG]);
    const pathname = usePathname();
    const isActive = (path) => pathname === path ? "active" : "";
    const profileData = getProfile();

    return (
        <div className='fixed-mobile-menu isMobile'>
            <div className={`grid gap-1 h-full ${profileData.viewOnly ? 'grid-cols-4' : 'grid-cols-5'}`}>
                <Link className={isActive("/home")} href="/home">
                    <span className='flex flex-col items-center justify-center h-full gap-2'>
                        <i className='icon-home-01'></i>
                        <i className="icon-home-01-1 active"></i>
                        <span className="txt text-center">{translation.mobile.home}</span>
                    </span>
                </Link>
                <Link className={isActive("/products")} href={`/products?${profileData.viewOnly ? 'itemStatus=ALL' : 'itemStatus=AVAILABLE'}`}>
                    <span className='flex flex-col items-center justify-center h-full gap-2'>
                        <i className='icon-shop'></i>
                        <i className='icon-shop-1 active'></i>
                        <span className="txt text-center">{translation.mobile.marketplace}</span>
                    </span>
                </Link>
                <Link className={isActive("/brands")} href="/brands">
                    <span className='flex flex-col items-center justify-center h-full gap-2'>
                        <i className='icon-medal-star'></i>
                        <i className="icon-medal-star-1 active"></i>
                        <span className="txt text-center">{translation.mobile.brands}</span>
                    </span>
                </Link>
                {
                    !profileData.viewOnly && (
                        <Link className={isActive("/cart")} href="/cart">
                            <span className='flex flex-col items-center justify-center h-full gap-2'>
                                <span className="cart-icon relative">
                                    {cartLength > 0 && (
                                        <span className="cart-count-num">{cartLength}</span>
                                    )}
                                    <i className="icon-bag-happy"></i>
                                    <i className="icon-bag-happy-1 active"></i>
                                </span>
                                <span className="txt text-center">{translation.mobile.bin}</span>
                            </span>
                        </Link>
                    )
                }
                <Link className={isActive("/profile")} href="/profile?personal">
                    <span className='flex flex-col items-center justify-center h-full gap-2'>
                        <i className='icon-user-03'></i>
                        <i className="icon-user-03-1 active"></i>
                        <span className="txt text-center">{translation.mobile.myAccount}</span>
                    </span>
                </Link>
            </div>
        </div>
    )
}
