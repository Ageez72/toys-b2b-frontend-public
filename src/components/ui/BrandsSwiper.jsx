"use client";
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '../../../context/AppContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from './Loaders/Loader';
import Placeholder from "../../../src/assets/imgs/200x100.svg"
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { BASE_API, endpoints } from '../../../constant/endpoints';
import CardLoader from './Loaders/CardLoader';


export default () => {
    const [activeTooltip, setActiveTooltip] = useState(null);
    const router = useRouter();
    const { state = {}, dispatch = () => { } } = useAppContext() || {};

    async function fetchHomeBrands() {
        const lang = Cookies.get('lang') || 'AR';
        try {
            const res = await axios.get(`${BASE_API}${endpoints.home.brandsSwiper}&lang=${lang}&token=${Cookies.get('token')}`, {});
            return res;
        } catch (error) {
            error.status === 401 && router.push("/");
        }
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['homeBrands'],
        queryFn: fetchHomeBrands,
        retry: false,
    });

    if (isLoading) return <CardLoader />;
    if (error instanceof Error) return router.push("/");

    const toggleTooltip = (key) => {
        setActiveTooltip(activeTooltip === key ? null : key);
    }

    return (
        <Swiper
            dir={state.LANG === "AR" ? "rtl" : "ltr"}
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={10}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            className='brands-swiper'
            loop={true}
            breakpoints={{
                450: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                },
                760: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 4.5,
                    spaceBetween: 20,
                },
            }}
        >
            {
                data?.data.map((slide, i) => (
                    <SwiperSlide key={slide.description + slide.brandID}>
                        <Link
                            href={`/products?brand=${slide.brandID}&itemStatus=AVAILABLE`}
                            className="block w-full h-full relative z-10"
                        >
                            <div className="relative group brands card" style={{ height: "132px" }} onClick={() => toggleTooltip(slide.description)}>
                                <div className={`
                                absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 
                                transition-opacity duration-300 
                                ${activeTooltip === slide.description ? "opacity-100" : "opacity-0"} 
                                group-hover:opacity-100 pointer-events-none
                            `}>
                                    <div className="relative w-max px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow">
                                        {slide.description}
                                        <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                    </div>
                                </div>
                                <Image
                                    className="brand-logo pointer-events-auto"
                                    src={slide.image !== "" ? slide.image : Placeholder}
                                    alt={slide.description !== "" ? slide.description : 'Brand'}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </Link>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};