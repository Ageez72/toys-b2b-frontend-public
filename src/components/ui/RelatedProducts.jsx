import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_API, endpoints } from '../../../constant/endpoints';
import ProductCard from './ProductCard';
import VerticalLoader from './Loaders/VerticalLoader';

export default function RelatedProducts({ items }) {
    const lang = Cookies.get('lang') || 'AR';
    const { push } = useRouter();
    async function fetchRelatedProducts() {
        const res = await axios.get(`${BASE_API}${endpoints.products.list}&lang=${lang}&id=${items.join(',')}&token=${Cookies.get('token')}`, {});
        return res;
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ['related-products'],
        queryFn: fetchRelatedProducts,
    });


    //   if (isLoading) return <VerticalLoader />;
    if (error instanceof Error) return push("/");

    return (
        <>
            <div className={`${data?.data?.items?.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4" : ""} products-page-listing`}>
                {
                    isLoading && (
                        <VerticalLoader />
                    )
                }
                {data?.data?.items?.length > 0 && (
                    data.data.items.map((item) => (
                        <ProductCard key={item.id} type="h" item={item} related={true} />
                    ))
                )
                }
            </div>
        </>
    )
}
