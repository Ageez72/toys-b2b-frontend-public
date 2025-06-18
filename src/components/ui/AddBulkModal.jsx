'use client';
import React, { useState } from 'react';
import SearchInput from './SearchInput';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel
} from '@headlessui/react';

export default function AddBulkModal({ open, onClose }) {
    const [bulkItems, setBulkItems] = useState([
        { isConfirmed: false } // Start with one empty row
    ]);

    const handleProductSelect = (selectedItem, index) => {
        const exists = bulkItems.find(item => item.id === selectedItem.id);
        if (exists) {
            alert('هذا المنتج مضاف بالفعل');
            return;
        }

        const updated = [...bulkItems];
        updated[index] = {
            ...selectedItem,
            qty: 1,
            total: selectedItem.price * 1,
            isConfirmed: true
        };

        // Add a new empty search row at the end
        setBulkItems([...updated, { isConfirmed: false }]);
    };

    const updateQty = (index, qty) => {
        let parsedQty = Math.max(0, parseInt(qty || 0));
        const updated = [...bulkItems];
        const maxQty = updated[index].avlqty;

        if (parsedQty > maxQty) {
            alert(`الكمية لا يمكن أن تتجاوز ${maxQty}`);
            parsedQty = maxQty;
        }

        updated[index].qty = parsedQty;
        updated[index].total = parsedQty * updated[index].price;
        setBulkItems(updated);
    };

    const removeRow = (index) => {
        const updated = [...bulkItems];
        updated.splice(index, 1);
        setBulkItems(updated);
    };

    const handleSubmit = () => {
        const selectedItems = bulkItems.filter(item => item.isConfirmed);
        console.log('Selected Items:', selectedItems);
        // You can emit this list, send to API, etc.
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-9999">
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
                            <h2 className="modal-title">أضف الكثير من المنتجات بضغطة واحدة</h2>
                            <div className="add-bulk-table">
                                    <div className="table-head flex gap-4">
                                        <div className="name-qty flex items-center justify-between">
                                            <div className="name">الاسم</div>
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
                                        {bulkItems.map((item, index) => (
                                            <div key={index} className="product-row flex items-center gap-4">
                                                <div className="name-qty flex items-center justify-between">
                                                    <div className="name">
                                                        <label className="mobile-title hidden">الاسم</label>
                                                        {item.isConfirmed ? (
                                                            <input
                                                                type="text"
                                                                value={item.name}
                                                                readOnly
                                                                className="w-full mobile-box"
                                                            />
                                                        ) : (
                                                            <SearchInput
                                                                bulk={true}
                                                                onCollectBulkItems={(selectedItem) =>
                                                                    handleProductSelect(selectedItem, index)
                                                                }
                                                                pageSize="10"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="qty">
                                                        <label className="mobile-title hidden">الكمية</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            placeholder="الكمية"
                                                            value={item.qty || ''}
                                                            onChange={(e) =>
                                                                updateQty(index, parseInt(e.target.value || '0'))
                                                            }
                                                            className="w-full mobile-box"
                                                            disabled={!item.isConfirmed}
                                                        />
                                                    </div>
                                                </div>

                                                {item.isConfirmed && (
                                                    <div className="info flex items-center justify-between">
                                                        <div className="item flex-2">
                                                            <label className='mobile-title hidden'>رقم المنتج SKU</label>
                                                            <span className="mobile-box">{item.id}</span>
                                                        </div>
                                                        <div className="item flex-1">
                                                            <label className='mobile-title hidden'>حالة التوفر</label>
                                                            <span className="mobile-box">{item.status}</span>
                                                        </div>
                                                        <div className="item flex-1">
                                                            <label className='mobile-title hidden'>اجمالي القطع</label>
                                                            <span className="mobile-box">{item.avlqty}</span>
                                                        </div>
                                                        <div className="item flex-1">
                                                            <label className='mobile-title hidden'>سعر القطعة</label>
                                                            <span className="mobile-box">
                                                                {item.price?.toFixed(2)} دينار
                                                            </span>
                                                        </div>
                                                        <div className="item flex-1">
                                                            <label className='mobile-title hidden'>إجمالي السعر</label>
                                                            <span className="mobile-box">
                                                                {item.total?.toFixed(2)} دينار
                                                            </span>
                                                        </div>
                                                        <div className="item delete">
                                                            <button
                                                                className="delete-btn"
                                                                onClick={() => removeRow(index)}
                                                            >
                                                                <i className="icon-minus"></i>
                                                                <span className="mobile-title hidden">حذف</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                <div className="action-btns flex gap-3 mt-4">
                                    <button className="primary-btn" onClick={handleSubmit}>
                                        إضافة
                                    </button>
                                    <button className="gray-btn" onClick={onClose}>
                                        إلغاء
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}