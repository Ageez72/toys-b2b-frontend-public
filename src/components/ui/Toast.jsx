// components/Toast.js
'use client';
import { createPortal } from 'react-dom';

export default function Toast({ message, type = 'success' }) {
  if (!message) return null;

  return createPortal(
    <div className={`fixed bottom-32 right-6 z-[99999] px-4 py-2 rounded-lg shadow-lg transition-all ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {message}
    </div>,
    typeof window !== 'undefined' ? document.body : null
  );
}
