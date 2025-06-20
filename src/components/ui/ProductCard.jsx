"use client";
import React, { useState } from 'react';
import StarsRate from './StarsRate';
import Badge from "./Badge";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AddToCart from './AddToCart';

export default function ProductCard({ type, badgeType, related, item }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/products/${item.id}`);
    };

    const handleBadgeType = (item) => {
        let type = "";
        if (item.status === "OUTOFSTOCK") {
            type = "red"
        } else if (item.status === "INSTOCK" && item.isNew) {
            type = "blue"
        } else if (item.status === "INSTOCK" && !item.isNew) {
            type = "new"
        } else if (item.commingSoon) {
            type = "yellow"
        }
        return type
    }

    const handleBadgeText = (item) => {
        let text = "";
        if (item.isNew) {
            text = "جديد"
        } else if (item.commingSoon) {
            text = "قريبا"
        } else if (item.discountType === 'CLEARANCE') {
            text = "تصفية"
        } else if (item.discountType !== 'CLEARANCE' && item.itemdisc > 0) {
            text = "خصم";
        }

        return text
    }

    const rate = item?.reviews.rating || 0;
    return (
        <div className={`card product-card ${type === 'grid' ? 'grid-card flex items-center gap-3' : 'list-card'}`}>
            <div className="product-card-image">
                <img src={item?.images["800"]?.main} alt={item?.name} layout="responsive" />
            </div>
            <div className="product-card-content">

                <Badge type={badgeType || handleBadgeType(item)} text={handleBadgeText(item)} />
                <h3 className="product-card-title cursor-pointer" onClick={handleClick} >{item.name}</h3>
                {<Link href={``}>
                    <p className="product-card-description" dangerouslySetInnerHTML={{ __html: `${item?.type} - ${item?.category?.description}` }} />
                </Link>}
                <div className="stars flex items-center gap-1">
                    <StarsRate rate={rate} />
                </div>
                <div className="price flex items-center gap-3">
                    <span className="product-card-price">
                        <span className="price-number">{item?.price} </span>
                        <span className="price-unit">دينار</span>
                    </span>
                    {
                        item?.itemdisc ? (
                            <span className='flex gap-1 discount'>
                                <span>{item?.itemdisc}.00</span>
                                <span>دينار</span>
                            </span>
                        ) : ""
                    }
                </div>
                {
                    item?.status === "INSTOCK" ? (
                        <AddToCart item={item} />
                    ) : (
                        <p className='out-stock-btn'>غير متوفر</p>
                    )
                }

            </div>
        </div>
    )
}
