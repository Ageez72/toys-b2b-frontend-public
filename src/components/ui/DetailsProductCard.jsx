"use client";
import React, { useState, useEffect } from 'react';
import StarsRate from './StarsRate';
import Link from 'next/link';
import AddToCart from './AddToCart';
import Badge from './Badge';
import { useAppContext } from '../../../context/AppContext';
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";

export default function DetailsProductCard({ item }) {
    const { state = {} } = useAppContext() || {};
    const [translation, setTranslation] = useState(ar); // fallback to Arabic

    useEffect(() => {
        if (state.LANG === "EN") {
            setTranslation(en);
        } else {
            setTranslation(ar);
        }
    }, [state.LANG]);

    const rate = item?.reviews.rating || 0;
    return (
        <div className="card product-card">
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
                <h1 className="product-card-title" title={item.name}>{item.name}</h1>
                <p className="product-card-description">
                    <Link href={`/products?brand=${item?.brand?.id}`}>
                        <span className="product-card-brand">{item?.brand?.description}</span>
                    </Link>
                    <span className='mx-1'>-</span>
                    <Link href={`/products?category=${item?.category?.id}`}>
                        <span className="product-card-category">{item?.category?.description}</span>
                    </Link>
                </p>

                <div className="price flex items-center gap-3">
                    <span className="product-card-price">
                        <span className="price-number">{item?.price} </span>
                        <span className="price-unit">{translation.jod}</span>
                    </span>
                    {
                        item?.itemdisc ? (
                            <span className='flex gap-1 discount'>
                                <span>{item?.priceAfterDisc}.00</span>
                                <span>{translation.jod}</span>
                            </span>
                        ) : ""
                    }
                </div>

                <div className="stars flex items-center gap-2">
                    <StarsRate rate={rate} />
                    <span className="rate-number">{`(${item?.reviews?.reviews?.length || 0} ${translation.reviews})`}</span>
                </div>
                <p className="product-description" dangerouslySetInnerHTML={{ __html: item?.description }} />
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
