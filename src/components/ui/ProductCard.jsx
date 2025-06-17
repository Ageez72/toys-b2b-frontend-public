"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Badge from "./Badge";

export default function ProductCard({ type, badgeType, badgeText, item }) {
    const [count, setCount] = useState(0);
    const increase = () => setCount(prev => prev + 1);
    const decrease = () => setCount(prev => prev - 1);
    const handleAddToCart = () => {
        console.log("Added to cart");
    };
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setCount(value);
        }
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
        // if(item.status === "OUTOFSTOCK") {
        //     text = "OUT OF STOCK"
        // } else if(item.status === "INSTOCK" && item.isNew) {
        //     text = "NEW"
        // } else if(item.status === "INSTOCK" && !item.isNew) {
        //     text = "IN STOCK"
        // } else if(item.commingSoon) {
        //     text = "COMMING SOON"
        // }
        if (item.isNew) {
            text = "جديد"
        } else if (item.commingSoon) {
            text = "قريبا"
        } else if (item.itemdisc) {
            text = "تصفية"
        } else {
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
                <h3 className="product-card-title">{item?.name}</h3>
                {/* <Link href={``}>
                    <p className="product-card-description" dangerouslySetInnerHTML={{ __html: `${item?.type} - ${item?.category?.description}` }} />
                </Link> */}
                <div className="stars flex items-center gap-1">
                    {
                        rate && rate > 0 ?
                            Array.from({ length: 5 }, (_, index) => (
                                index < rate ? <i key={index} className="icon-star-fill-sm"></i> : <i className="icon-star-blank-sm"></i>
                            )) : (
                                <>
                                    <i className="icon-star-blank-sm"></i>
                                    <i className="icon-star-blank-sm"></i>
                                    <i className="icon-star-blank-sm"></i>
                                    <i className="icon-star-blank-sm"></i>
                                    <i className="icon-star-blank-sm"></i>
                                </>
                            )
                    }
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
                        <div className="add-to-cart flex items-center gap-3">
                            <div className="product-card-quantity flex items-center gap-1 w-1/2">
                                <button onClick={decrease} className="btn btn-secondary w-fit">
                                    <i className="icon-minus"></i>
                                </button>
                                <input className='w-fit' type="number" min={0} value={count <= 0 ? 0 : count} onChange={handleQuantityChange} />
                                <button onClick={increase} className="btn btn-secondary w-fit">
                                    <i className="icon-add"></i>
                                </button>
                            </div>
                            <button onClick={handleAddToCart} className="primary-btn w-1/2 add-to-cart-btn">اضف</button>
                        </div>
                    ) : (
                        <p className='out-stock-btn'>OUT OF STOCK</p>
                    )
                }

            </div>
        </div>
    )
}
