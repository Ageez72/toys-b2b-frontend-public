"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import heroAll from "../../assets/imgs/hero.png";
import hero from "../../assets/imgs/hero-bg.png";
import heroLeft from "../../assets/imgs/hero-left.png";
import heroRight from "../../assets/imgs/hero-right.png";
import AddBulkModal from './AddBulkModal';
import SidebarModal from './SideModal';
import SearchInput from './SearchInput';
import QuickAdd from './QuickAdd';

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarModalOpen, setIsSidebarModalOpen] = useState(false);

    return (
        <>
            <SidebarModal
                open={isSidebarModalOpen}
                onClose={() => {
                    setIsSidebarModalOpen(false)
                    document.documentElement.classList.remove("html-overflow")
                }}
            />
            <AddBulkModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <main className="hero-section" style={{ backgroundImage: `url(${hero.src})` }}>
                <div className="hero-content">
                    <h1 className="hero-title text-center">وفّر وقتك وأضف منتجاتك بالجملة في ثوانٍ</h1>
                    <QuickAdd openSidebar={() => setIsSidebarModalOpen(true)} />
                    <button className='add-bulk-open-btn' onClick={() => setIsModalOpen(true)}>
                        <i className="icon-element-plus"></i>
                        إضافة سريعة بالجملة
                    </button>
                </div>
                <div className="hero-images">
                    <Image
                        className="logo-img hero-side-image left"
                        src={heroLeft}
                        alt="My Image"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                    <Image
                        className="logo-img hero-side-image right"
                        src={heroRight}
                        alt="My Image"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>
            </main>
        </>
    )
}
