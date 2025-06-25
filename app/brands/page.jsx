"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '@/components/ui/Loaders/Loader';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_API, endpoints } from '../../constant/endpoints';
import Placeholder from "../../src/assets/imgs/200x100.svg"
import en from "../../locales/en.json";
import ar from "../../locales/ar.json";
import { useAppContext } from '../../context/AppContext';

async function fetchBrandsPage() {
  const lang = Cookies.get('lang') || 'AR';
  const res = await axios.get(`${BASE_API}${endpoints.home.brandsSwiper}&lang=${lang}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    }
  });
  return res;
}

export default function Page() {
  const { push } = useRouter();
  const { state = {}, dispatch = () => { } } = useAppContext() || {};
  const [translation, setTranslation] = useState(ar); // default fallback
  useEffect(() => {
    setTranslation(state.LANG === "EN" ? en : ar);
  }, [state.LANG]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['brandsPage'],
    queryFn: fetchBrandsPage,
  });

  if (isLoading) return <Loader />;
  if (error instanceof Error) return push("/");

  return (
    <div className="container">
      <h2 className="main-title mt-40 mb-4">{translation.brands}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-40">
        {
          data?.data.map((brand, i) => (
            <Link href={`/products?brand=${brand.brandID}`} key={brand.brandID}>
              <div className="relative brans card" style={{ height: "132px" }}>
                <Image
                  className='relative'
                  src={brand.image !== "" ? brand.image : Placeholder}
                  alt="Brand 1"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}