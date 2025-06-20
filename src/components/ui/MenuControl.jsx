'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LangSwitcher from './LangSwitcher';
import ProfileDropdown from './ProfileDropdown';
import Link from 'next/link';

export default function MenuControl() {
    const [cartLength, setCartLength] = useState(0);

    useEffect(() => {
        const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
        setCartLength(cart.length);
    }, []);

    return (
        <div className='flex items-center'>
            <LangSwitcher top={true} />
            <div className="flex items-center justify-between gap-3">
                <div className="vl"></div>
                <div className="circle-icon-container">
                    <span className='cart-icon relative'>
                        {cartLength > 0 && (
                            <span className='cart-count-num'>{cartLength}</span>
                        )}
                        <Link href="/cart">
                            <i className="icon-bag-happy"></i>
                        </Link>
                    </span>
                </div>
                <ProfileDropdown />
            </div>
        </div>
    );
}
