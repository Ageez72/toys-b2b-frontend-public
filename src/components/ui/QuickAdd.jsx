'use client';

import { useState, useEffect } from 'react';
import { addToCart, getCart } from '@/actions/utils';
import { useAppContext } from '../../../context/AppContext';
import SearchInput from './SearchInput';
import Toast from './Toast';
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";
import WarningModal from './WarningModal';
import SuccessToast from './SuccessToast';

export default function QuickAdd({ openSidebar }) {
    const [count, setCount] = useState('');
    const [selectedItem, setSelectedItem] = useState([]);
    const [resetSearch, setResetSearch] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [warningPopupMessage, setWarningPopupMessage] = useState('');
    const { state = {}, dispatch = () => { } } = useAppContext() || {};

    const [translation, setTranslation] = useState(ar);
    useEffect(() => {
        setTranslation(state.LANG === 'EN' ? en : ar);
    }, [state.LANG]);

    const showToast = (message) => {
        setPopupMessage(message);
        setTimeout(() => setPopupMessage(''), 3000);
    };

    const showToastError = (message) => {
        setWarningPopupMessage(message);
        setIsModalOpen(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setWarningPopupMessage('');
        }, 4000);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        setCount(isNaN(value) || value < 1 ? 1 : value);
    };

    const getSelectedProduct = (item) => {
        setSelectedItem(item);
    };

    const handleAddToCart = () => {
        if (!selectedItem?.id || !count) return;

        const result = addToCart({
            item: selectedItem.id,
            qty: count.toString(),
            image: selectedItem.images?.['800']?.main,
            name: selectedItem.name,
            price: selectedItem.price,
            avlqty: selectedItem.avlqty,
        });

        if (!result.success) {
            showToastError(result.message);
        } else {
            setCount('');
            setSelectedItem([]);
            setResetSearch(true);
            const storedCart = getCart();
            if (storedCart) {
                dispatch({ type: 'STORED-ITEMS', payload: storedCart });
            }
            showToast(translation.addedToCart);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-9999">
                {popupMessage && (
                    <SuccessToast
                        open={isModalOpen}
                        message={popupMessage}
                    />
                )}
                {warningPopupMessage && (
                    <WarningModal
                        open={isModalOpen}
                        message={warningPopupMessage}
                    />
                )}
            </div>

            <div className="quick-add-container flex">
                <div className="search-input form-group mb-0">
                    <div className="relative h-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <i className="icon-search-normal"></i>
                        </div>
                        <div
                            className="absolute inset-y-0 start-0 flex items-center pe-3.5 password-icon"
                            onClick={() => {
                                openSidebar();
                                document.documentElement.classList.add('html-overflow');
                            }}
                        >
                            <i className="icon-setting-4"></i>
                        </div>
                        <SearchInput
                            bulk={false}
                            onCollectQuickAdd={getSelectedProduct}
                            resetTrigger={resetSearch}
                            onResetDone={() => setResetSearch(false)}
                        />
                    </div>
                </div>

                <div className="quantatity-container flex items-center gap-2 card">
                    <div className="form-group mb-0">
                        <div className="relative">
                            <input
                                className="p-2.5"
                                placeholder={translation.qty}
                                value={count}
                                type="number"
                                min="0"
                                onChange={handleQuantityChange}
                            />
                        </div>
                    </div>
                    <button className="primary-btn" onClick={handleAddToCart}>
                        <i className="icon-plus"></i>
                        <span>{translation.add}</span>
                    </button>
                </div>
            </div>
        </>
    );
}
