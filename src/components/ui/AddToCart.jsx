'use client';

import { useState } from 'react';
import { addToCart } from '@/actions/utils';

export default function AddToCart({ item }) {
    const [count, setCount] = useState(1);

    const increase = () => setCount(prev => prev + 1);
    const decrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        setCount(isNaN(value) || value < 1 ? 1 : value);
    };    

    const handleAddToCart = () => {
        addToCart({
            item: item.id,
            qty: count.toString(),
            image: item.images["800"].main,
            name: item.name,
            price: item.price
        });
        setCount(0)
        alert('تمت الإضافة إلى السلة');
    };

    return (
        <div className="add-to-cart flex items-center gap-3 w-full">
            <div className="product-card-quantity flex items-center gap-1 w-1/2">
                <button onClick={decrease} className="btn btn-secondary w-fit">
                    <i className="icon-minus"></i>
                </button>
                <input
                    className="w-fit text-center"
                    type="number"
                    min={1}
                    value={count}
                    onChange={handleQuantityChange}
                />
                <button onClick={increase} className="btn btn-secondary w-fit">
                    <i className="icon-add"></i>
                </button>
            </div>
            <button onClick={handleAddToCart} className="primary-btn w-1/2 add-to-cart-btn">
                اضف
            </button>
        </div>
    );
}
