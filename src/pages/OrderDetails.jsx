'use client'
import { useSearchParams } from 'next/navigation';

export default function OrderDetails() {
    const searchParams = useSearchParams()

    const id = searchParams.get('id')
    console.log(id);

    return (
        <div>
            Order Details
        </div>
    )
}
