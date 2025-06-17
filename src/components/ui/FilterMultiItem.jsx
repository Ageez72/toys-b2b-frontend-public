'use client'
import React, { useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

export default function FilterMultiItem({
    title,
    selected = [],
    options = [],
    name,
    onOptionsChange
}) {
    const [selectedValues, setSelectedValues] = useState(selected);

    // 👉 Compute whether any selected item exists in the options list
    const defaultOpen = selected.some(sel =>
        options.some(opt => opt.brandID === sel)
    );

    const toggleValue = (value) => {
        setSelectedValues(prev => {
            const newSelected = prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value];

            onOptionsChange(newSelected); // Notify parent
            return newSelected;
        });
    };

    return (
        <div className="accordion-wrapper">
            <Disclosure defaultOpen={defaultOpen}>
                {({ open: isOpen }) => (
                    <div>
                        <DisclosureButton className="accordion-item w-full flex items-center justify-between cursor-pointer">
                            <span className="title small-title">{title}</span>
                            <i className={`icon-arrow-down-01-round arrow-down ${isOpen ? 'rotate-180' : ''}`}></i>
                        </DisclosureButton>

                        <DisclosurePanel>
                            <div className="options-list">
                                {options.map((option) => (
                                    <div className="form-group flex items-center gap-3" key={option.brandID}>
                                        <input
                                            className="cursor-pointer"
                                            id={option.brandID}
                                            type="checkbox"
                                            name={name}
                                            value={option.brandID}
                                            checked={selectedValues.includes(option.brandID)}
                                            onChange={() => toggleValue(option.brandID)}
                                        />
                                        <label htmlFor={option.brandID} className="mb-0 cursor-pointer">
                                            {option.description}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </div>
                )}
            </Disclosure>
        </div>
    );
}
