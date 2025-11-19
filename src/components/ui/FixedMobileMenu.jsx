import React from 'react'
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";

export default function FixedMobileMenu() {
    const { state = {}, dispatch = () => { } } = useAppContext() || {};
    const [translation, setTranslation] = useState(ar);

    return (
        <div className='fixed-mobile-menu isMobile'>
            <div className="grid grid-cols-5 gap-1 h-full">
                <a href="/home">
                    <span className='flex flex-col items-center justify-center h-full gap-2'>
                        <i className='icon-home-01'></i>
                        <span className="txt text-center">{translation.home}</span>
                    </span>
                </a>
                <a href="/home">
                    <span className='flex flex-col items-center justify-center h-full gap-2'>
                        <i className='icon-shop'></i>
                        <span className="txt text-center">{translation.home}</span>
                    </span>
                </a>
                <a href="/brands">
                    <span className='flex flex-col items-center justify-center h-full gap-2'>
                        <i className='icon-medal-star'></i>
                        <span className="txt text-center">{translation.brands}</span>
                    </span>
                </a>
                <a href="/home">
                    <span className='flex flex-col items-center justify-center h-full gap-2'>
                        <i className='icon-bag-happy'></i>
                        <span className="txt text-center">{translation.home}</span>
                    </span>
                </a>
                <a href="/home">
                    <span className='flex flex-col items-center justify-center h-full gap-2'>
                        <i className='icon-user-03'></i>
                        <span className="txt text-center">{translation.home}</span>
                    </span>
                </a>
            </div>
        </div>
    )
}
