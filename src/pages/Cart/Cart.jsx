'use client';
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InlineAddToCart from "@/components/ui/InlineAddToCart";
import { getCart } from "@/actions/utils";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    const items = getCart();
    setCartItems(items);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const breadcrumbItems = [
    { label: 'الرئيسية', href: '/home' },
    { label: `سلة المشتريات` }
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-4 pt-15 cart-page">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex gap-7 mt-5 pt-5">
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-5">
            <h3 className="sub-title">المنتجات المضافة </h3>
            <div className="items-count">{cartItems.length}</div>
          </div>

          {cartItems.map((item, index) => (
            <div key={item.item} className="card space-y-4 mb-6">
              <div className="cart-item flex items-center">
                <div className="image-container flex justify-between items-center w-16">
                  <img src={item.image} width={52} height={52} alt={item.name || "Product"} />
                </div>
                <div className="info flex-1 px-4">
                  <p className="name font-medium">{item.name}</p>
                  <p className="price flex items-center gap-1 mb-0 text-sm text-gray-700">
                    <span>{item.price}</span>
                    <span>دينار</span>
                  </p>
                </div>
                <div className="actions w-48">
                  <InlineAddToCart
                    itemId={item.item}
                    onQtyChange={loadCart} // Refresh cart when qty changes
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-1/4">
          <div className="card p-4">
            {/* Summary or Checkout */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
