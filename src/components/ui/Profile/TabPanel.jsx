'use client';

import { useEffect, useState } from 'react';
export default function TabPanel({ id, activeTab, children, open }) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open && activeTab === id) {
      // small delay to trigger transition
      const timer = setTimeout(() => setAnimateIn(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
    }
  }, [open, activeTab, id]);

  if (activeTab !== id) return null;
  return (
    <div className={`profile-tab-panel p-4 bg-white rounded-lg shadow ${animateIn ? 'open' : ''}`} id={id}>
      {children}
    </div>
  );
}
