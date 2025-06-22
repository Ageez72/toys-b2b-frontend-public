import React from 'react';
import Link from 'next/link';
import { useAppContext } from "../../../context/AppContext";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_API, endpoints } from '../../../constant/endpoints';
import Loader from './Loaders/Loader';

export default function ProfileDropdown() {
    const { push } = useRouter();
    const { state = {}, dispatch = () => { } } = useAppContext() || {};
    async function fetchProfile() {
        const res = await axios.get(`${BASE_API}${endpoints.user.profile}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            }
        });
        return res;
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
    });

    const getInitials = (str) => {
        if (!str) return ['', ''];
        const words = str.trim().split(/\s+/);
        const first = words[0]?.[0] || '';
        const last = words[words.length - 1]?.[0] || '';
        return [first.toUpperCase(), last.toUpperCase()];
    };


    const [firstInitial, lastInitial] = getInitials(data?.data?.name);
    
    if(data?.data){
        Cookies.set('profile', JSON?.stringify(data?.data))
    }

    if (isLoading) return <Loader />;
    if (error instanceof Error) return push("/");
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="inline-flex w-full lang-switcher">
                        <span>
                            <i className="icon-user"></i>
                        </span>
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className={`absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in profile-dropdown ${state.LANG === "EN" ? "right-0" : "right-auto left-0"}`}
                >
                    <div className="py-1 text-right">
                        <div className="flex profile-dropdown-header px-4 py-2">
                            <div className="me-3 shrink-0">
                                <span className="profile-img block p-2 bg-gray-100 rounded-lg dark:bg-gray-700">
                                    <span>{firstInitial}</span>
                                    <span>.</span>
                                    <span>{lastInitial}</span>
                                </span>
                            </div>
                            <div>
                                <p className="mb-0 username text-base leading-none text-gray-900 dark:text-white">
                                    {data?.data?.name}
                                </p>
                                <p className="user-email mb-0 mt-2 text-sm font-normal">
                                    {data?.data?.email}
                                </p>
                            </div>
                        </div>
                        <MenuItem>
                            <Link href="/profile" className='profile-item flex items-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                                <i className="icon-user"></i>
                                <span className="flex items-center justify-between block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                                    الملف الشخصي
                                </span>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/profile" className='profile-item flex items-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                                <i className="icon-shield-security"></i>
                                <span className="flex items-center justify-between block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                                    الحماية والأمان
                                </span>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/profile" className='profile-item flex items-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                                <i className="icon-task"></i>
                                <span className="flex items-center justify-between block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                                    طلباتي
                                </span>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/profile" className='profile-item flex items-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                                <i className="icon-location"></i>
                                <span className="flex items-center justify-between block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                                    العناوين
                                </span>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/profile" className='profile-item flex items-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                                <i className="icon-user"></i>
                                <span className="flex items-center justify-between block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                                    تسجيل الخروج
                                </span>
                            </Link>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
        </>
    )
}
