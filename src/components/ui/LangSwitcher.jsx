"use client"
import React from 'react';
import { useAppContext } from "../../../context/AppContext";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Cookies from 'js-cookie';

export default function LangSwitcher({top}) {
    const { state = {}, dispatch = () => {} } = useAppContext() || {};

    const handleChangeLanguage = (e) => {
        dispatch({ type: "LANG", payload: e });
        Cookies.set("lang", e)
        // document.documentElement.setAttribute("dir", e === "AR" ? "rtl" : "ltr");
        // document.documentElement.setAttribute("lang", e);
        window.location.reload();
    };
    const getLangClass = () => {
        if(top && state.LANG === "EN"){
            return "right-0";
        } else if(top && state.LANG === "AR"){
            return "left-0";
        }
    }
    return (

        <>
            <Menu as="div" className={`${top ? 'relative' : ''} inline-block text-left`}>
                {/* <div> */}
                    <MenuButton className="inline-flex w-full lang-switcher">
                        <span>
                            <i className="icon-global"></i>
                        </span>
                    </MenuButton>
                {/* </div> */}

                <MenuItems
                    transition
                    className={`absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in lang-switcher-dropdown ${top ? "top-12" : "top-16"} ${getLangClass()}`}
                >
                    <div className="py-1 text-right">
                        <MenuItem>
                            <span
                                onClick={() => handleChangeLanguage("AR")}
                                className="flex items-center justify-between block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                                <span>
                                    العربية
                                </span>
                                {
                                    state.LANG === "AR" && (
                                        <i className="icon-tick-circle"></i>
                                    )
                                }
                            </span>
                        </MenuItem>
                        <MenuItem>
                            <span
                                onClick={() => handleChangeLanguage("EN")}
                                className="flex items-center justify-between block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                                <span>
                                    English
                                </span>
                                {
                                    state.LANG === "EN" && (
                                        <i className="icon-tick-circle"></i>
                                    )
                                }
                            </span>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
        </>
    )
}
