'use client';
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InlineAddToCart from "@/components/ui/InlineAddToCart";
import { getCart, getProfile } from "@/actions/utils";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [addressesItems, setAddressesItems] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [notes, setNotes] = useState('');

  const loadCart = () => {
    const items = getCart();
    setCartItems(items);
  };
  const loadAddresses = () => {
    const items = getProfile();
    setAddressesItems(items.locations);
  };

  useEffect(() => {
    loadCart();
    loadAddresses();
  }, []);

  const breadcrumbItems = [
    { label: 'الرئيسية', href: '/home' },
    { label: `سلة المشتريات` }
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-4 pt-15 cart-page">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex gap-7 mt-5 pt-5">
        <div className="order-side">
          <div className="flex justify-between items-center mb-5">
            <h3 className="sub-title">المنتجات المضافة </h3>
            <div className="items-count flex justify-center items-center">{cartItems.length}</div>
          </div>

          {cartItems.length ? (
            <>
              {
                cartItems.map((item) => (
                  <div key={item.item} className="card space-y-4 mb-5">
                    <div className="cart-item flex items-center">
                      <div className="image-container flex justify-center items-center w-16">
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
                ))
              }
              <h3 className="sub-title mb-4 mt-8">ملاحظات حول الطلب</h3>
              <div className="card">
                <textarea className="w-full h-full notes-text" name="notes" placeholder="قم بإضافة ملاحظاتك .." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
              </div>
              <h3 className="sub-title mb-4 mt-8">عنوان الشحن</h3>
              <div className="addresses">
                {
                  addressesItems.map((add, index) => (
                    <div className="card mb-3" key={add.id}>
                      <div className="address-item">
                        <input type="radio" name="address" id={`address-${index}`} value={add.id} checked={selectedAddressId === add.id} onChange={() => setSelectedAddressId(add.id)} />
                        <label htmlFor={`address-${index}`} className="flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            <i className="icon-location location"></i>
                            <span>{add.address}</span>
                          </span>
                          <i className="icon-tick-circle check"></i>
                        </label>
                      </div>
                    </div>
                  ))
                }
              </div>
            </>
          ) : (
            <p>Empty</p>
          )
          }
        </div>

        <div className="order-summary">
          <div className="card p-4">
            <h3 className="sub-title mb-3">ملخص الطلب</h3>
            <div className="order-item flex justify-between items-center mb-4">
              <p className="mb-0">عدد المنتجات</p>
              <p className="mb-0">{cartItems.length}</p>
            </div>
            <div className="order-item flex justify-between items-center mb-4">
              <p className="mb-0">التوصيل</p>
              <p className="mb-0 flex items-center gap-1">
                <span>80</span>
                <span>دينار</span>
              </p>
            </div>
            <div className="order-item flex justify-between items-center mb-4">
              <p className="mb-0">المجموع الفرعي</p>
              <p className="mb-0 flex items-center gap-1">
                <span>80</span>
                <span>دينار</span>
              </p>
            </div>
            <div className="order-item flex justify-between items-center mb-4">
              <p className="mb-0">الخصم</p>
              <p className="mb-0 flex items-center gap-1">
                <span>80</span>
                <span>دينار</span>
              </p>
            </div>
            <hr />
            <div className="order-item flex justify-between items-center mb-4">
              <h3 className="sub-title">المجموع الكلي</h3>
              <p className="mb-0 flex items-center gap-1 price">
                <span>80</span>
                <span>دينار</span>
              </p>
            </div>
            <button className="primary-btn w-full">تأكيد الطلب</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
