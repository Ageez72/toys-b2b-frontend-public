'use client';
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InlineAddToCart from "@/components/ui/InlineAddToCart";
import { getCart, getProfile } from "@/actions/utils";
import ConfirmOrderModal from "@/components/ui/ConfirmOrderModal";
import SureOrderModal from "@/components/ui/SureOrderModal";
import Link from "next/link";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [addressesItems, setAddressesItems] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [notes, setNotes] = useState('');
  const [openSureOrder, setOpenSureOrder] = useState(false)
  const [openConfirmOrder, setOpenConfirmOrder] = useState(false)

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
      <div className="flex gap-7 mt-5 pt-5 flex-col lg:flex-row">
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
                          <span>{Number(item.price).toFixed(2)}</span>
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
            <div className='card empty-state flex justify-center items-center'>
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="261" height="260" viewBox="0 0 261 260" fill="none">
                  <rect x="0.5" width="260" height="260" rx="130" fill="url(#paint0_linear_239_8280)" />
                  <path opacity="0.4" d="M178.766 87.2H176.1L153.566 64.6667C151.766 62.8667 148.833 62.8667 146.966 64.6667C145.166 66.4667 145.166 69.4 146.966 71.2667L162.9 87.2H98.0997L114.033 71.2667C115.833 69.4667 115.833 66.5333 114.033 64.6667C112.233 62.8667 109.3 62.8667 107.433 64.6667L84.9663 87.2H82.2997C76.2997 87.2 63.833 87.2 63.833 104.267C63.833 110.733 65.1663 115 67.9663 117.8C69.5663 119.467 71.4997 120.333 73.5663 120.8C75.4997 121.267 77.5663 121.333 79.5663 121.333H181.433C183.5 121.333 185.433 121.2 187.3 120.8C192.9 119.467 197.166 115.467 197.166 104.267C197.166 87.2 184.7 87.2 178.766 87.2Z" fill="#7E818E" />
                  <path d="M181.566 121.333H79.5664C77.6331 121.333 75.4997 121.267 73.5664 120.733L81.9664 172C83.8997 183.467 88.8997 196.667 111.1 196.667H148.5C170.966 196.667 174.966 185.4 177.366 172.8L187.433 120.733C185.566 121.2 183.566 121.333 181.566 121.333ZM143.3 169.267C142.3 170.267 141.033 170.733 139.766 170.733C138.5 170.733 137.233 170.267 136.233 169.267L130.566 163.6L124.7 169.467C123.7 170.467 122.433 170.933 121.166 170.933C119.9 170.933 118.633 170.467 117.633 169.467C115.7 167.533 115.7 164.333 117.633 162.4L123.5 156.533L117.833 150.867C115.9 148.933 115.9 145.733 117.833 143.8C119.766 141.867 122.966 141.867 124.9 143.8L130.566 149.467L136.033 144C137.966 142.067 141.166 142.067 143.1 144C145.033 145.933 145.033 149.133 143.1 151.067L137.633 156.533L143.3 162.2C145.3 164.2 145.3 167.333 143.3 169.267Z" fill="#7E818E" />
                  <defs>
                    <linearGradient id="paint0_linear_239_8280" x1="130.5" y1="0" x2="130.5" y2="260" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E9EBED" />
                      <stop offset="1" stopColor="white" />
                    </linearGradient>
                  </defs>
                </svg>
                <h2 className='sub-title my-4 text-center'>
                  لا يوجد منتجات حتى الآن!
                </h2>
                <Link href="/home" className="primary-btn inline-flex">
                  العودة إلى المتجر
                </Link>
              </div>
            </div>
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
                <span>{cartItems.length ? Number(20.62).toFixed(2) : 0}</span>
                <span>دينار</span>
              </p>
            </div>
            <div className="order-item flex justify-between items-center mb-4">
              <p className="mb-0">المجموع الفرعي</p>
              <p className="mb-0 flex items-center gap-1">
                <span>{cartItems.length ? Number(10).toFixed(2) : 0}</span>
                <span>دينار</span>
              </p>
            </div>
            <div className="order-item flex justify-between items-center mb-4">
              <p className="mb-0">الخصم</p>
              <p className="mb-0 flex items-center gap-1">
                <span>{cartItems.length ? Number(80).toFixed(2) : 0}</span>
                <span>دينار</span>
              </p>
            </div>
            <hr />
            <div className="order-item flex justify-between items-center mb-4">
              <h3 className="sub-title">المجموع الكلي</h3>
              <p className="mb-0 flex items-center gap-1 price">
                <span>{cartItems.length ? Number(110.62).toFixed(2) : 0}</span>
                <span>دينار</span>
              </p>
            </div>
            <button className={`primary-btn w-full ${cartItems.length ? '' : 'disabled'}`} onClick={() => setOpenSureOrder(true)}>تأكيد الطلب</button>
          </div>
        </div>
      </div>

          <SureOrderModal setOpen={() => setOpenSureOrder(false)} open={openSureOrder} openConfim={() => setOpenConfirmOrder(true)} />
          <ConfirmOrderModal setOpen={() => setOpenConfirmOrder(true)} open={openConfirmOrder} />
    </div>
  );
}

export default Cart;
