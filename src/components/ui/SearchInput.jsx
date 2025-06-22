"use client";
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_API, endpoints } from '../../../constant/endpoints';
import { useDebounce } from '../../../lib/useDebounce';
import Link from 'next/link';

export default function SearchInput({ bulk, onCollectBulkItems, pageSize, onCollectQuickAdd, resetTrigger, onResetDone }) {
    const { push } = useRouter();
    const [searchText, setSearchText] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [hasSelected, setHasSelected] = useState(false);
    const debouncedSearchText = useDebounce(searchText, 500);
    const lang = Cookies.get('lang') || 'AR';

    // ✅ Clear cookie once on first render
    useEffect(() => {
        Cookies.remove('store_filters');
    }, []);

    useEffect(() => {
        if (resetTrigger) {
            setSearchText('');
            setSelectedProduct(null);
            setHasSelected(false);
            onResetDone?.(); // Notify parent reset is complete
        }
    }, [resetTrigger, onResetDone]);

    // ✅ Fetch latest cookie inside query function
    const fetchProducts = async ({ queryKey }) => {
        const [_key, searchText] = queryKey;
        const filterItems = Cookies.get('store_filters') || '';
        const token = Cookies.get('token');

        const url = `${BASE_API}${endpoints.products.list}&search=${searchText}&pageSize=${pageSize ? pageSize : 3}&${filterItems}&itemStatus=INSTOCK&lang=${lang}`;

        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res.data;
    };

    const { data, isFetching, error } = useQuery({
        queryKey: ['products-search-list', debouncedSearchText],
        queryFn: fetchProducts,
        enabled: debouncedSearchText.length >= 3 && !hasSelected,
    });

    useEffect(() => {
        if (error instanceof Error) {
            push('/');
        }
    }, [error, push]);

    const handleSelectProduct = (item) => {
        setSelectedProduct(item);
        setSearchText(item.name);
        setHasSelected(true);
        onCollectBulkItems && onCollectBulkItems(item)
        onCollectQuickAdd && onCollectQuickAdd(item)
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        if (hasSelected) setHasSelected(false);
    };

    const showResults = data?.items?.length > 0 && !hasSelected;
    const filterItems = Cookies.get('store_filters') || '';

    return (
        <>
            <input
                className={`w-full h-full ${!bulk ? 'ps-10 p-2.5' : ''}`}
                type='text'
                placeholder='البحث عن منتج'
                value={searchText}
                onChange={handleInputChange}
            />

            {showResults && (
                <div className={`search-results-listing ${bulk ? 'bulk-listing' : ''}`}>
                    {data.items.map((item) => (
                        <div className='search-item flex items-center justify-evenly' key={item.id}>
                            <span className='image'>
                                <img width={40} height={40} src={item.images["50"].main} alt={item.name} />
                            </span>
                            <span className='title' onClick={() => handleSelectProduct(item)}>{item.name}</span>
                            <span className='price'>{item.priceAfterDisc} دينار</span>
                            <Link href="/dd" className='view-details flex items-center'>
                                <span className="icon-arrow-left-01-round"></span>
                            </Link>
                        </div>
                    ))}

                    {
                        !bulk && (
                            <>
                                <hr />
                                <Link
                                    href={`/products?search=${searchText}&pageSize=3&${filterItems}&itemStatus=INSTOCK&lang=EN`}
                                    className='flex items-center gap-2 all-products'
                                >
                                    عرض جميع المنتجات
                                    <span className="icon-arrow-left-01-round"></span>
                                </Link>
                            </>
                        )
                    }
                </div>
            )}

            {data?.items?.length === 0 && !hasSelected && (
                <div className={`search-results-listing no-results`}>
                    لا توجد نتائج
                </div>
            )}
        </>
    );
}
