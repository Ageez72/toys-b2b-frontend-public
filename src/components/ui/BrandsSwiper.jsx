"use client";
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


async function fetchHomeBrands() {
    const lang = Cookies.get('lang') || 'AR';
    const res = await axios.get(`${BASE_API}${endpoints.home.brandsSwiper}&lang=${lang}&token=${Cookies.get('token')}`, {});
    return res;
}

export default () => {
    const { state = {}, dispatch = () => { } } = useAppContext() || {};

    const { data, isLoading, error } = useQuery({
        queryKey: ['homeBrands'],
        queryFn: fetchHomeBrands,
    });

    if (isLoading) return <CardLoader />;
    if (error instanceof Error) return push("/");

    return (
        <Swiper
            dir={state.LANG === "AR" ? "rtl" : "ltr"}
            modules={[Autoplay]}
            slidesPerView={1.5}
            spaceBetween={10}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
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
                        <Link href={`/products?brand=${slide.brandID}&itemStatus=AVAILABLE`}>
                            <div className="relative brands card" style={{ height: "132px" }}>
                                <Image
                                    className='brand-logo'
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