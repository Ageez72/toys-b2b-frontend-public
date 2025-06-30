"use client";
import React, { useState, useEffect } from 'react';
import StarsRate from './StarsRate';
import Badge from "./Badge";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AddToCart from './AddToCart';
import { useAppContext } from '../../../context/AppContext';
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";

export default function ProductCard({ type, badgeType, related, item }) {
    const { state = {}, dispatch = () => { } } = useAppContext() || {};
    const [translation, setTranslation] = useState(ar); // fallback to Arabic

    useEffect(() => {
        if (state.LANG === "EN") {
            setTranslation(en);
        } else {
            setTranslation(ar);
        }
    }, [state.LANG]);
    const router = useRouter();

    const handleClick = () => {
        router.push(`/products/${item.id}`);
    };

    const rate = item?.reviews.rating || 0;
    return (
        <div className={`card product-card ${type === 'grid' ? 'grid-card flex items-center gap-3' : 'list-card'}`}>
            <div className="product-card-image">
                <Link href={`/products/${item.id}`}>
                    <img src={item?.images["800"]?.main} alt={item?.name} layout="responsive"  title={item.name}/>
                </Link>
            </div>
            <div className="product-card-content">
                {
                    item.isNew && (
                        <Badge type={item.isNew && 'blue'} text={`${translation.new}`} />
                    )
                }
                {
                    item.commingSoon && (
                        <Badge type={item.commingSoon && 'yellow'} text={`${translation.soon}`} />
                    )
                }
                {
                    item.itemdisc > 0 && (
                        <Badge type={item.itemdisc > 0 && 'green'} text={`${translation.discount2} ${item.itemdisc} ${translation.percentage}`} />
                    )
                }
                {
                    item.discountType === 'CLEARANCE' && (
                        <Badge type={item.discountType === 'CLEARANCE' && 'red'} text={`${translation.only} ${item.avlqty} ${translation.pieces}`} />
                    )
                }
                <h1 className="product-card-title cursor-pointer short-title" title={item.name}>
                    <Link href={`/products/${item.id}`}>
                        {item.name}
                    </Link>
                </h1>
                <p className='product-card-description'>
                    <Link href={`/products?brand=${item?.brand?.id}`}>
                        <span className="product-card-brand">{item?.brand?.description}</span>
                    </Link>
                    <span className='mx-1'>-</span>
                    <Link href={`/products?category=${item?.category?.id}`}>
                        <span className="product-card-category">{item?.category?.description}</span>
                    </Link>
                </p>
                <div className="stars flex items-center gap-1">
                    <StarsRate rate={rate} />
                </div>
                <div className="price flex items-center gap-3">
                    <span className="product-card-price">
                        <span className="price-number">{Number(item?.priceAfterDisc).toFixed(2)}</span>
                        <span className="price-unit">{translation.jod}</span>
                    </span>
                    {
                        item?.itemdisc ? (
                            <span className='flex gap-1 discount'>
                                <span>{Number(item?.price).toFixed(2)}</span>
                                <span>{translation.jod}</span>
                            </span>
                        ) : ""
                    }
                </div>
                {
                    item?.status === "AVAILABLE" ? (
                        <AddToCart item={item} />
                    ) : (
                        <p className='out-stock-btn'>{translation.notAvailable}</p>
                    )
                }

            </div>
        </div>
    )
}
