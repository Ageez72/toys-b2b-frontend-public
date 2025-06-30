'use client';
import { useState, useEffect } from 'react';
import { addToCart, getCart } from '@/actions/utils';
import { useAppContext } from '../../../context/AppContext';
import Toast from './Toast';
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";
import WarningModal from './WarningToast';
import SuccessToast from './SuccessToast';

export default function AddToCart({ item }) {
  const [count, setCount] = useState(1);
  const { state = {}, dispatch = () => { } } = useAppContext() || {};
  const [translation, setTranslation] = useState(ar); // default fallback
  useEffect(() => {
    if (state.LANG === "EN") {
      setTranslation(en);
    } else {
      setTranslation(ar);
    }
  }, [state.LANG]);

  // ✅ Toast state and function
  const [popupMessage, setPopupMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warningPopupMessage, setWarningPopupMessage] = useState('');

  const showToast = (message) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage('');
    }, 3000);
  };

  const showToastError = (message) => {
    setWarningPopupMessage(message);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setWarningPopupMessage('');
    }, 4000);
  };
  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setCount(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    const result = addToCart({
      item: item.id,
      qty: count.toString(),
      image: item.images['800'].main,
      name: item.name,
      price: item.price,
      avlqty: item.avlqty
    });

    if (!result.success) {
      showToastError(result.message);
    } else {
      setCount(1);
      const storedCart = getCart();
      if (storedCart) {
        dispatch({ type: 'STORED-ITEMS', payload: storedCart });
      }

      // ✅ Show success toast
      showToast(translation.addedToCart);
    }
  };

  return (
    <>
      {/* ✅ Toast Message */}
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
          {translation.addCart}
        </button>
      </div>
    </>
  );
}
