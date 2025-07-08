"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import heroAll from "../../assets/imgs/hero.png";
import hero from "../../assets/imgs/hero-bg.png";
import heroLeft from "../../assets/imgs/hero-left.png";
import heroRight from "../../assets/imgs/hero-right.png";
import AddBulkModal from './AddBulkModal';
import SidebarModal from './SideModal';
import SearchInput from './SearchInput';
import QuickAdd from './QuickAdd';
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";
import { useAppContext } from "../../../context/AppContext";

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarModalOpen, setIsSidebarModalOpen] = useState(false);
    const { state = {}, dispatch = () => {} } = useAppContext() || {};
    const [translation, setTranslation] = useState(ar); // default fallback

    useEffect(() => {
        setTranslation(state.LANG === "EN" ? en : ar);
        document.title = state.LANG === 'AR' ? ar.alekha : en.alekha;
    }, [state.LANG]);

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
                    <h1 className="hero-title text-center">{translation.heroTitle}</h1>
                    <QuickAdd openSidebar={() => setIsSidebarModalOpen(true)} />
                    <button className='add-bulk-open-btn' onClick={() => setIsModalOpen(true)}>
                        <i className="icon-element-plus"></i>
                        {translation.bulkTitle}
                    </button>
                </div>
                <div className="hero-images">
                    <Image
                        className="logo-img hero-side-image left"
                        src={heroLeft}
                        alt="Hero Left"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                    <Image
                        className="logo-img hero-side-image right"
                        src={heroRight}
                        alt="Hero Right"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <h2 className='adds-title'>Regional Leaders<br/> In Toy Distribution</h2>
            </main>
        </>
    );
}
