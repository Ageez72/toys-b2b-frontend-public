'use client';
import { useState } from 'react';
import { profileTabs } from './tabs';
import TabPanel from './TabPanel';
import { getProfile } from '@/actions/utils';

export default function ProfileTabs() {
    const [activeTab, setActiveTab] = useState('personal');
    const getInitials = (str) => {
        if (!str) return ['', ''];
        const words = str.trim().split(/\s+/);
        const first = words[0]?.[0] || '';
        const last = words[words.length - 1]?.[0] || '';
        return [first.toUpperCase(), last.toUpperCase()];
    };

    const profileData = getProfile();
    const [firstInitial, lastInitial] = getInitials(profileData?.name);

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <aside className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow profile-side-bar">
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
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center w-full text-right cursor-pointer px-2 py-2 rounded-md ${activeTab === tab.id ? 'active' : 'hover:bg-gray-100'
                                    }`}
                            >
                                <i className={tab.icon}></i>
                                <span className="flex items-center justify-between block px-2 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                                    {tab.label}
                                </span>

                            </button>
                        </li>
                    ))}
                </ul>
                <button className="text-red-600 mt-4 flex items-center gap-2 hover:underline cursor-pointer">
                    <i className="icon-logout-03"></i>
                    <span className="flex items-center justify-between block px-2 py-2 text-sm data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                        تسجيل الخروج
                    </span>
                </button>
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
