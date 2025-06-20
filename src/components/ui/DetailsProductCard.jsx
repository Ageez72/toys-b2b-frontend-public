"use client";
import React, { useState } from 'react';
import StarsRate from './StarsRate';
import Link from 'next/link';
import AddToCart from './AddToCart';

export default function DetailsProductCard({ item }) {
    const rate = item?.reviews.rating || 0;
    return (
        <div className="card product-card">
            <div className="product-card-content">
                <h3 className="product-card-title"><Link href={`products/${item?.brand.id}`}>{item.name}</Link></h3>
                {<Link href={``}>
                    <p className="product-card-description" dangerouslySetInnerHTML={{ __html: `${item?.type} - ${item?.category?.description}` }} />
                </Link>}

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

                <div className="stars flex items-center gap-1">
                    <StarsRate rate={rate} />
                </div>
                <p className="product-description" dangerouslySetInnerHTML={{ __html: item?.description}} />
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
