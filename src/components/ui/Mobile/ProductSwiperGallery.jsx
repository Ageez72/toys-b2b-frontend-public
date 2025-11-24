'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

export default function ProductSwiperGallery({ images }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="product-swiper-gallery">
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 card"
            >
                {
                    images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img src={img} alt='image' />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img src={img} alt='image' />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}
