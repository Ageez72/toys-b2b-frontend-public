'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { profileTabs } from './tabs';
import TabPanel from './TabPanel';
import { getProfile, logout } from '@/actions/utils';

export default function ProfileTabs() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('personal');
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const queryTab = searchParams?.keys().next().value;
        if (queryTab && profileTabs.some(t => t.id === queryTab)) {
            setActiveTab(queryTab);
        }
        const profile = getProfile();
        setProfileData(profile ? profile : []);
    }, [searchParams]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        router.replace(`/profile?${tabId}`);
    };

    const getInitials = (str) => {
        if (!str) return ['', ''];
        const words = str.trim().split(/\s+/);
        const first = words[0]?.[0] || '';
        const last = words[words.length - 1]?.[0] || '';
        return [first.toUpperCase(), last.toUpperCase()];
    };

    const [firstInitial, lastInitial] = getInitials(profileData?.name);

    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Sidebar */}
            <aside className="w-full md:w-1/4 profile-side-bar">
                <div className="bg-white p-4 rounded-lg p-4 mb-4">
                    <div className="flex profile-dropdown-header px-4 py-2">
                        <div className="me-3 shrink-0">
                            <span className="profile-img block p-2 bg-gray-100 rounded-full">
                                <span>{firstInitial}</span>
                                <span>.</span>
                                <span>{lastInitial}</span>
                            </span>
                        </div>
                        <div>
                            <p className="mb-0 username text-base leading-none text-gray-900 dark:text-white">
                                {profileData?.name}
                            </p>
                            <p className="user-email mb-0 mt-2 text-sm font-normal">
                                {profileData?.email}
                            </p>
                        </div>
                    </div>
                    <ul className="pt-3">
                        {profileTabs.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`flex items-center w-full text-right cursor-pointer px-2 py-2 rounded-md ${activeTab === tab.id ? 'active' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <i className={tab.icon}></i>
                                    <span className="flex items-center justify-between block px-2 py-2">
                                        {tab.label}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white rounded-lg p-2">
                    <button className="w-full logout flex items-center gap-2 cursor-pointer" onClick={logout}>
                        <i className="icon-logout-03"></i>
                        <span className="flex items-center justify-between block px-2 py-2">
                            تسجيل الخروج
                        </span>
                    </button>
                </div>
            </aside>

            {/* Tab Content */}
            <div className="w-full md:w-3/4">
                <TabPanel id="personal" activeTab={activeTab}>
                    <p className="text-gray-600">محتوى الملف الشخصي هنا...</p>
                </TabPanel>
                <TabPanel id="security" activeTab={activeTab}>
                    <p className="text-gray-600">إعدادات الأمان وكلمة المرور.</p>
                </TabPanel>
                <TabPanel id="orders" activeTab={activeTab}>
                    <p className="text-gray-600">قائمة الطلبات الخاصة بك.</p>
                </TabPanel>
                <TabPanel id="addresses" activeTab={activeTab}>
                    <p className="text-gray-600">العناوين المحفوظة.</p>
                </TabPanel>
            </div>
        </div>
    );
}
