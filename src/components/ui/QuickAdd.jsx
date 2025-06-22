'use client';

import { useState } from 'react';
import { addToCart, getCart } from '@/actions/utils';
import { useAppContext } from '../../../context/AppContext';
import SearchInput from './SearchInput'

export default function QuickAdd({ openSidebar }) {
    const [count, setCount] = useState("");
    const [selectedItem, setSelectedItem] = useState([]);
    const [resetSearch, setResetSearch] = useState(false);
    const { state = {}, dispatch = () => { } } = useAppContext() || {};

    // ✅ Toast state and function
    const [popupMessage, setPopupMessage] = useState('');
    const [popupMessageError, setPopupMessageError] = useState('');

    const showToast = (message) => {
        setPopupMessage(message);
        setTimeout(() => {
            setPopupMessage('');
        }, 3000);
    };
    const showToastError = (message) => {
        setPopupMessageError(message);
        setTimeout(() => {
            setPopupMessageError('');
        }, 3000);
    };
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        setCount(isNaN(value) || value < 1 ? 1 : value);
    };

    const getSelectedProduct = (item) => {
        setSelectedItem(item)
    }
    const handleAddToCart = () => {
        if (!selectedItem?.id || !count) return;

        const result = addToCart({
            item: selectedItem.id,
            qty: count.toString(),
            image: selectedItem.images['800'].main,
            name: selectedItem.name,
            price: selectedItem.price,
            avlqty: selectedItem.avlqty
        });

        if (!result.success) {
            showToastError(result.message); // or show toast
        } else {
            setCount(""); // Reset quantity
            setSelectedItem([]); // Reset selected product

            // Trigger search input reset
            setResetSearch(true);

            const storedCart = getCart();
            if (storedCart) {
                dispatch({ type: 'STORED-ITEMS', payload: storedCart });
            }

            showToast('تمت الإضافة إلى السلة');
        }

    };

    return (
        <>
            {/* ✅ Toast Message */}
            {popupMessage && (
                <div className="fixed bottom-16 right-6 z-[99999] bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg transition-all py-4">
                    {popupMessage}
                </div>
            )}
            {popupMessageError && (
                <div className="fixed bottom-16 right-6 z-[99999] bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-lg transition-all">
                    {popupMessageError}
                </div>
            )}
            <div className="quick-add-container flex">
                <div className='search-input form-group mb-0'>
                    <div className='relative h-full'>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <i className="icon-search-normal"></i>
                        </div>
                        <div className="absolute inset-y-0 start-0 flex items-center pe-3.5 password-icon" onClick={() => {
                            openSidebar()
                            document.documentElement.classList.add("html-overflow")
                        }}>
                            <i className="icon-setting-4"></i>
                        </div>
                        <SearchInput bulk={false} onCollectQuickAdd={getSelectedProduct} resetTrigger={resetSearch}
                            onResetDone={() => setResetSearch(false)} />
                    </div>
                </div>
                <div className='quantatity-container flex items-center gap-2 card'>
                    <div className='form-group mb-0'>
                        <div className="relative">
                            <input className='p-2.5' placeholder='الكمية' value={count} type='number' min="0" onChange={handleQuantityChange} />
                        </div>
                    </div>
                    <button className='primary-btn' onClick={handleAddToCart}>
                        <i className="icon-plus"></i>
                        <span>إضافة</span>
                    </button>
                </div>
            </div>
        </>
    )
}
