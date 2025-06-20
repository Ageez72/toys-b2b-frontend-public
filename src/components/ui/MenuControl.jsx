'use client';
import React, {useEffect} from 'react';
import { useAppContext } from '../../../context/AppContext';
import LangSwitcher from './LangSwitcher';
import ProfileDropdown from './ProfileDropdown';
import Link from 'next/link';

export default function MenuControl() {
  const { state } = useAppContext();
  let cartLength = state.STOREDITEMS.length;

  useEffect(()=>{
    cartLength = state.STOREDITEMS.length;
  }, [state.STOREDITEMS])

  return (
    <div className='flex items-center'>
      <LangSwitcher top={true} />
      <div className="flex items-center justify-between gap-3">
        <div className="vl"></div>
        <div className="circle-icon-container">
          <span className='cart-icon relative'>
              <Link href="/cart">
            {cartLength > 0 && (
              <span className='cart-count-num'>{cartLength}</span>
            )}
              <i className="icon-bag-happy"></i>
            </Link>
          </span>
        </div>
        <ProfileDropdown />
      </div>
    </div>
  );
}
