'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getCart } from '@/actions/utils';

export default function InlineAddToCart({ itemId, onQtyChange }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const cart = getCart();
        const item = cart.find(i => i.item === itemId);
        if (item) {
            setCount(parseInt(item.qty));
        }
    }, [itemId]);

    const updateCart = (newQty) => {
        let cart = getCart();
        const index = cart.findIndex(i => i.item === itemId);

        if (newQty <= 0) {
            if (index !== -1) {
                cart.splice(index, 1);
            }
        } else {
            if (index !== -1) {
                cart[index].qty = newQty.toString();
            } else {
                cart.push({ item: itemId, qty: newQty.toString() });
            }
        }

        Cookies.set('cart', JSON.stringify(cart), { expires: 7, path: '/' });
        setCount(newQty);

        if (onQtyChange) onQtyChange();
    };

    const removeFromCart = () => {
        let cart = getCart();
        const newCart = cart.filter(item => item.item !== itemId);
        Cookies.set('cart', JSON.stringify(newCart), { expires: 7, path: '/' });
        setCount(0); // reset qty to 0 in UI
        if (onQtyChange) onQtyChange();
    };

    const increase = () => updateCart(count + 1);
    const decrease = () => updateCart(count > 0 ? count - 1 : 0);

    return (
        <div className="add-to-cart flex gap-3">
            <div className="product-card-quantity flex items-center gap-1 w-3/4">
                <button onClick={decrease} className="btn btn-secondary w-fit">
                    <i className="icon-minus"></i>
                </button>
                <span className="min-w-[32px] text-center">{count}</span>
                <button onClick={increase} className="btn btn-secondary w-fit">
                    <i className="icon-add"></i>
                </button>
            </div>

            <div
                className="w-1/4 text-center remove-cart-item flex items-center justify-center cursor-pointer"
                onClick={removeFromCart}
                title="Remove item"
            >
                <i className="icon-trash text-red-500"></i>
            </div>
        </div>
    );
}
