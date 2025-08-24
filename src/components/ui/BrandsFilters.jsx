"use client"
import React, { useState, useEffect } from 'react';
import FilterMultiItem from './FilterMultiItem';
import { BASE_API, endpoints } from '../../../constant/endpoints';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";
import { useAppContext } from '../../../context/AppContext';
import { useRouter } from 'next/navigation';


export default function BrandsFilters({ selected = [], parentOptions, brandsOptions }) {
    const [selectedMap, setSelectedMap] = useState({});
    const [allSelected, setAllSelected] = useState(selected); // flat array of selected IDs
    const router = useRouter();

    const { state = {}, dispatch = () => { } } = useAppContext() || {};
    const [translation, setTranslation] = useState(ar);

    useEffect(() => {
        setTranslation(state.LANG === "EN" ? en : ar);
    }, [state.LANG]);


    useEffect(() => {
        if (selected.length > 0 && brandsOptions?.length) {
            const initialMap = {};
            brandsOptions.forEach((brandGroup) => {
                initialMap[brandGroup.code] = brandGroup.brands
                    .filter((b) => selected.includes(b.brandID))
                    .map((b) => b.brandID);
            });

            setSelectedMap(initialMap);
        }
    }, [brandsOptions, selected]);

    const handleOptionsChange = (brandCode, selectedItems) => {
        setSelectedMap((prev) => {
            const updated = { ...prev, [brandCode]: selectedItems };
            const allSelected = Object.values(updated).flat();
            parentOptions(false, allSelected);
            return updated;
        });
    };

    return (
        <div className="accordion-wrapper">
            <Disclosure defaultOpen={selected.length > 0}>
                {({ open: isOpen }) => (
                    <div>
                        <DisclosureButton className="accordion-item w-full flex items-center justify-between cursor-pointer">
                            <span className="title">{translation.brands}</span>
                            <i className={`icon-arrow-down-01-round arrow-down ${isOpen ? 'rotate-180' : ''}`}></i>
                        </DisclosureButton>

                        <DisclosurePanel>
                            <DisclosurePanel>
                                {brandsOptions?.map((brand) =>
                                    brand.brands?.length > 0 && (
                                        <FilterMultiItem
                                            key={brand.code}
                                            title={brand.code}
                                            options={brand.brands}
                                            name="brand"
                                            selected={selectedMap[brand.code] || []}
                                            onOptionsChange={(code, selectedItems) =>
                                                handleOptionsChange(code, selectedItems)
                                            }
                                        />
                                    )
                                )}
                            </DisclosurePanel>
                        </DisclosurePanel>
                    </div>
                )}
            </Disclosure>
        </div>
    );
}


