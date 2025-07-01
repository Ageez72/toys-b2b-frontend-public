'use client';

import { useState, useEffect } from 'react';
import { addToCart, getCart } from '@/actions/utils';
import { useAppContext } from '../../../context/AppContext';
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";
import { showSuccessToast, showErrorToast, showWarningToast } from '@/actions/toastUtils';

export default function AddToCart({ item }) {
  const [count, setCount] = useState(1);
  const { state = {}, dispatch = () => {} } = useAppContext() || {};
  const [translation, setTranslation] = useState(ar); // default fallback

  useEffect(() => {
    setTranslation(state.LANG === "EN" ? en : ar);
  }, [state.LANG]);

  const lang = state.LANG || 'EN';

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
      image: item.images?.['800']?.main,
      name: item.name,
      price: item.price,
      avlqty: item.avlqty
    });

    if (!result.success) {
      showErrorToast(result.message || translation.defaultError, lang, translation.error);
    } else {
      setCount(1);
      const storedCart = getCart();
      if (storedCart) {
        dispatch({ type: 'STORED-ITEMS', payload: storedCart });
      }

      showSuccessToast(translation.addedToCart, lang, translation.success);
    }
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
        {translation.addCart}
      </button>
    </div>
  );
}
