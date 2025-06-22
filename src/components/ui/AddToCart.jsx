'use client';

import { useState } from 'react';
import { addToCart, getCart } from '@/actions/utils';
import { useAppContext } from '../../../context/AppContext';

export default function AddToCart({ item }) {
  const [count, setCount] = useState(1);
  const { state = {}, dispatch = () => { } } = useAppContext() || {};

  // ✅ Toast state and function
  const [popupMessage, setPopupMessage] = useState('');

  const showToast = (message) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage('');
    }, 3000);
  };

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setCount(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    addToCart({
      item: item.id,
      qty: count.toString(),
      image: item.images['800'].main,
      name: item.name,
      price: item.price,
      avlqty: item.avlqty
    });

    setCount(1);

    const storedCart = getCart();
    if (storedCart) {
      dispatch({ type: 'STORED-ITEMS', payload: storedCart });
    }

    // ✅ Show success toast
    showToast('تمت الإضافة إلى السلة');
  };

  return (
    <>
      {/* ✅ Toast Message */}
      {popupMessage && (
        <div className="fixed bottom-16 right-6 z-[99999] bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg transition-all py-4">
          {popupMessage}
        </div>
      )}

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
    </>
  );
}
