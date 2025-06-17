import React from 'react'
import LangSwitcher from './LangSwitcher';
import ProfileDropdown from './ProfileDropdown';

export default function MenuControl() {
    return (
        <div className='flex items-center'>
            {/* <LangSwitcher /> */}
            <div className="flex items-center justify-between gap-3">
                <div className="vl"></div>
                <div className="circle-icon-container">
                    <span>
                        <i className="icon-bag-happy"></i>
                    </span>
                </div>
                <ProfileDropdown />
            </div>
        </div>
    )
}
