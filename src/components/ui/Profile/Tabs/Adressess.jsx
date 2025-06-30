"use client"
import React, { useState, useEffect } from 'react';
import { getProfile } from '@/actions/utils';
import { useAppContext } from '../../../../../context/AppContext';
import en from "../../../../../locales/en.json";
import ar from "../../../../../locales/ar.json";

export default function Adressess() {
  const [addressesItems, setAddressesItems] = useState([]);
  const { state = {}, dispatch = () => { } } = useAppContext() || {};
  const [translation, setTranslation] = useState(ar);
  useEffect(() => {
    setTranslation(state.LANG === "EN" ? en : ar);
  }, [state.LANG]);

  const loadAddresses = () => {
    const items = getProfile();
    setAddressesItems(items.locations);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  return (
    <div className='py-3'>
      <h2 className='sub-title mb-6'>{translation.addresses}</h2>
      {
        addressesItems.map((add, index) => (
          <div key={index} className="flex justify-between items-center adress-item mb-5">
            <span className="flex items-center gap-2">
              <i className="icon-location location"></i>
              <span>{add.address}</span>
            </span>
          </div>
        ))
      }
    </div>
  )
}
