'use client'
import React, {useState} from 'react'
import SearchInput from './SearchInput'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

export default function AddBulkModal({ open, onClose }) {
    const [bulkItems, setBulkItems] = useState([])

    const collectBulkItems = (item) => {
        setBulkItems(item);
    }

    return (
        <Dialog open={true} onClose={onClose} className="relative z-9999">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full">
                    <DialogPanel
                        transition
                        className="relative add-bulk-modal transform overflow-hidden rounded-lg bg-white text-start shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="p-32">
                            <h2 className='modal-title'>أضف الكثير من المنتجات بضغطة واحدة</h2>
                            <div className="add-bulk-table">
                                <div className="table-head flex gap-4">
                                    <div className="name-qty flex items-center justify-between">
                                        <div className="name">
                                            الأسم
                                        </div>
                                        <div className="qty">الكمية</div>
                                    </div>
                                    <div className="info flex items-center justify-between">
                                        <div className="item flex-2">رقم المنتج SKU</div>
                                        <div className="item flex-1">حالة التوفر</div>
                                        <div className="item flex-1">إجمالي القطع</div>
                                        <div className="item flex-1">سعر القطعة</div>
                                        <div className="item flex-1">إجمالي السعر</div>
                                        <div className="item delete"></div>
                                    </div>
                                </div>
                                <div className="table-body">
                                    {/* product 1 */}
                                    <div className="product-row flex items-center gap-4">
                                        <div className="name-qty flex items-center justify-between">
                                            <div className="name">
                                                <label className='mobile-title hidden'>الاسم</label>
                                                <SearchInput bulk={true} onCollectBulkItems={collectBulkItems} />
                                            </div>
                                            <div className="qty">
                                                <label className='mobile-title hidden'>المنتج</label>
                                                <input type='number' min="0" placeholder='الكمية' className='w-full mobile-box' />
                                            </div>
                                        </div>
                                        <div className="info flex items-center justify-between">
                                            <div className="item flex-2">
                                                <label className='mobile-title hidden'>رقم المنتج</label>
                                                <span className='mobile-box'>0001</span>
                                            </div>
                                            <div className="item flex-1">
                                                <label className='mobile-title hidden'>حالة التوفر</label>
                                                <span className='mobile-box'>متوفر</span>
                                            </div>
                                            <div className="item flex-1">
                                                <label className='mobile-title hidden'>اجمالي القطع</label>
                                                <span className='mobile-box'>0</span>
                                            </div>
                                            <div className="item flex-1">
                                                <label className='mobile-title hidden'>سعر القطعة</label>
                                                <span className='mobile-box'>
                                                    <span>0.00</span>
                                                    <span> دينار</span>
                                                </span>
                                            </div>
                                            <div className="item flex-1">
                                                <label className='mobile-title hidden'>إجمالي السعر</label>
                                                <span className='mobile-box'>
                                                    <span>0.00</span>
                                                    <span> دينار</span>
                                                </span>
                                            </div>
                                            <div className="item delete">
                                                <button className='delete-btn'>
                                                    <i className="icon-minus"></i>
                                                    <span className='mobile-title hidden'>حذف</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div className="action-btns flex gap-3">
                                    <button className='primary-btn'>إضافة</button>
                                    <button className='gray-btn' onClick={onClose}>إلغاء</button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}