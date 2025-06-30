import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getCart } from '@/actions/utils';
import WarningModal from './WarningToast';
import ErrorToast from './ErrorToast';
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";
import { useAppContext } from '../../../context/AppContext'

export default function InlineAddToCart({ itemId, avlqty, onQtyChange, onRefresh }) {
    const [count, setCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [warningPopupMessage, setWarningPopupMessage] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorPopupMessage, setErrorPopupMessage] = useState('');
    const { state = {}, dispatch = () => { } } = useAppContext() || {};
    const [translation, setTranslation] = useState(ar); // default fallback
    useEffect(() => {
        setTranslation(state.LANG === "EN" ? en : ar);
    }, [state.LANG]);

    useEffect(() => {
        const cart = getCart();
        const item = cart.find(i => i.item === itemId);
        if (item) setCount(parseInt(item.qty));
    }, [itemId]);

    const showWarningToast = (message) => {
        setWarningPopupMessage(message);
        setIsModalOpen(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setWarningPopupMessage('');
        }, 4000);
    };
    const showErrorToast = (message) => {
        setErrorPopupMessage(translation.itemRemoved);
        setIsErrorModalOpen(true);
        setTimeout(() => {
            setIsErrorModalOpen(false);
            setErrorPopupMessage('');
        }, 4000);
    };


    const updateCart = (newQty) => {
        let cart = getCart();
        const index = cart.findIndex(i => i.item === itemId);

        if (newQty <= 0) {
            if (index !== -1) cart.splice(index, 1);
        } else {
            if (index !== -1) {
                cart[index].qty = newQty.toString();
            } else {
                cart.push({ item: itemId, qty: newQty.toString() });
            }
        }

        Cookies.set('cart', JSON.stringify(cart), { expires: 7, path: '/' });
        const storedCart = getCart();
        if (storedCart) dispatch({ type: "STORED-ITEMS", payload: storedCart });

        setCount(newQty);
        if (onQtyChange) onQtyChange();
    };

    const removeFromCart = () => {
        let cart = getCart();
        const newCart = cart.filter(item => item.item !== itemId);
        Cookies.set('cart', JSON.stringify(newCart), { expires: 7, path: '/' });
        const storedCart = getCart();
        if (storedCart) dispatch({ type: "STORED-ITEMS", payload: storedCart });

        setCount(0);
        if (onQtyChange) onQtyChange();
        onRefresh && onRefresh();
        // showErrorToast()
        // setTimeout(() => {
        //     onRefresh && onRefresh();
        // }, 3000);
    };

    const increase = () => {
        if (count + 1 > avlqty) {
            setIsModalOpen(true);
            showWarningToast(state.LANG === "EN" ? `Only ${avlqty} item(s) are available in total.` : `متوفر فقط ${avlqty} قطعة من هذا المنتج.`);
            setTimeout(() => {
                setIsModalOpen(false);
            }, 4000);
            return;
        }
        updateCart(count + 1);
        onRefresh && onRefresh();
    };

    const decrease = () => {
        updateCart(count > 0 ? count - 1 : 0);
        onRefresh && onRefresh();
    };

    return (
        <>
            {isErrorModalOpen && (
                <ErrorToast
                    open={isErrorModalOpen}
                    message={errorPopupMessage}
                />
            )}
            {warningPopupMessage && (
                <WarningModal
                    open={isModalOpen}
                    message={warningPopupMessage}
                />
            )}
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
        </>
    );
}
