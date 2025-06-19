'use client'
import { useState } from 'react'
import RateModal from './RateModal'
import Rate from './Rate'

export default function RateCard({ reviews }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className='card mt-12'>
                <div className="flex justify-between">
                    <h3 className="sub-title">التقييمات</h3>
                    <button onClick={() => setOpen(true)} type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none cursor-pointer rounded border border-gray-200 bg-gray-100 hover:bg-white hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all">
                        <i className="icon-add"></i>
                        <span>اضف تقييمًا</span>
                    </button>
                </div>
                {
                    reviews?.map((review, index) => (
                        <Rate item={review} key={index} />
                    ))
                }
                <button className="view-more-reviews cursor-pointer w-full">
                    عرض المزيد من التقييمات
                </button>
            </div>
            <RateModal open={open} setOpen={() => setOpen(false)} />
        </>
    )
}
