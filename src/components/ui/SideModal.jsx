"use client";
import React from "react";
import FilterBar from "./FilterBar";
import { useAppContext } from '../../../context/AppContext';
import { endpoints } from "../../../constant/endpoints";

export default function SidebarModal({ open, onClose }) {
  let searchTerm = "";
  const { state = {}, dispatch = () => {} } = useAppContext() || {};
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-9999"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar-container fixed top-0 ${state.LANG === 'ar' ? 'right-0' : 'left-0 translate-x-full-100'} h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <FilterBar catalogEndpoint={`${endpoints.products.catalogList}`} categoriesEndpoint={`${endpoints.products.categoriesList}`} searchTerm={searchTerm} close={onClose} />
      </div>
    </>
  );
}
