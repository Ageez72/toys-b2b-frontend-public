'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductGallery from '@/components/ui/ProductGallery';
import DetailsProductCard from '@/components/ui/DetailsProductCard';
import RateCard from '@/components/ui/RateCard';
import Badge from '@/components/ui/Badge';
import RelatedProducts from '@/components/ui/RelatedProducts';
import { useAppContext } from "../../../context/AppContext";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_API, endpoints } from '../../../constant/endpoints';
import Link from 'next/link';
import Loader from '@/components/ui/Loaders/Loader';
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";

let breadcrumbItems = [];
export default function Page() {
  const [refresh, setRefresh] = useState(false);
  const { productId } = useParams();
  const lang = Cookies.get('lang') || 'AR';
      const { state = {}, dispatch = () => {} } = useAppContext() || {};
      const [translation, setTranslation] = useState(ar); // default fallback
      useEffect(() => {
          setTranslation(state.LANG === "EN" ? en : ar);
      }, [state.LANG]);

  const { push } = useRouter();
  async function fetchProductDetails() {
    const res = await axios.get(`${BASE_API}${endpoints.products.list}&lang=${lang}&id=${productId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    });
    return res;
  }
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`product-details-${productId}`],
    queryFn: fetchProductDetails,
  });

  // Effect to re-call the API whenever refresh is changed
  useEffect(() => {
    if (refresh) {
      refetch();
      setRefresh(false); // reset after fetching
    }
  }, [refresh, refetch]);

  let details = data?.data?.items[0];
  if (isLoading) return <Loader />;
  if (error instanceof Error) return push("/");

  breadcrumbItems = [
    { label: translation.home, href: '/home' },
    { label: `${details?.brand?.description}`, href: `/products?brand=${details?.brand?.id}` },
    { label: `${details?.name}`}
  ]

  return data ? (
    <div className="max-w-screen-xl mx-auto p-4 product-details">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 pt-5 pb-5 details-card">
        <ProductGallery images={details.images["800"].list} />
        <DetailsProductCard item={details} />
      </div>
      <div className="card mt-5">
        <p className="product-description" dangerouslySetInnerHTML={{ __html: details?.description }} />

        <h3 className="sub-title mb-3">{translation.catalogs}</h3>
        <div className="badges flex gap-2">
          {
            details?.catalogs?.map(b => (
              <Link href={`/products?catalog=${b?.id}`} key={b.id}>
                <Badge type={"catalog-details"} text={b?.description} />
              </Link>
            ))
          }
        </div>
      </div>
      <RateCard reviews={details.reviews.reviews} id={details.id} onRefresh={() => setRefresh(true)} />
      <h3 className="sub-title mb-3 mt-10">{translation.relatedProducts}</h3>
      <RelatedProducts items={details.relatedItems} />
    </div>
  ) : null;
}