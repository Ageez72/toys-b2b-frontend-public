"use client"
import React, { useState, useEffect } from 'react';
import FilterMultiItem from './FilterMultiItem';
import Loader from '@/components/ui/Loaders/Loader';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_API, endpoints } from '../../../constant/endpoints';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";
import { useAppContext } from '../../../context/AppContext';

async function fetchBrandsFilters() {
    const lang = Cookies.get('lang') || 'AR';
    const res = await axios.get(`${BASE_API}${endpoints.products.brandsFilters}&lang=${lang}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        }
    });
    return res;
}

export default function BrandsFilters({ selected = [], parentOptions }) {
    const [selectedMap, setSelectedMap] = useState({});
    const { state = {}, dispatch = () => { } } = useAppContext() || {};
    const [translation, setTranslation] = useState(ar); // default fallback
    useEffect(() => {
        setTranslation(state.LANG === "EN" ? en : ar);
    }, [state.LANG]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['brandsFilters'],
        queryFn: fetchBrandsFilters,
    });

    const handleOptionsChange = (brandCode, selectedItems) => {
        setSelectedMap(prev => {
            const updated = { ...prev, [brandCode]: selectedItems };

            // Flatten all selected values from all brand codes
            const allSelected = Object.values(updated).flat();

            parentOptions(allSelected); // pass to parent
            return updated;
        });
    };

    if (error instanceof Error) return <p>Error: {error.message}</p>;
    if (!data?.data?.length) return null;

    return (
        <div className="accordion-wrapper">
            <Disclosure defaultOpen={selected.length > 0}>
                {({ open: isOpen }) => (
                    <div>
                        <DisclosureButton
                            className="accordion-item w-full flex items-center justify-between cursor-pointer"
                        >
                            <span className="title">{translation.brands}</span>
                            <i className={`icon-arrow-down-01-round arrow-down ${isOpen ? 'rotate-180' : ''}`}></i>
                        </DisclosureButton>

                        <DisclosurePanel>
                            {data.data.map((brand) => (
                                <FilterMultiItem
                                    key={brand.code}
                                    title={brand.code}
                                    options={brand.brands}
                                    name="brand"
                                    selected={selected || []}
                                    onOptionsChange={(selectedItems) =>
                                        handleOptionsChange(brand.code, selectedItems)
                                    }
                                />
                            ))}
                        </DisclosurePanel>
                    </div>
                )}
            </Disclosure>
        </div>
    );
}

