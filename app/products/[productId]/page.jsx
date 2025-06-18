'use client';
import { useParams } from 'next/navigation';

export default function Page() {
  const { productId } = useParams();

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1>Products ID: {productId}</h1>
    </div>
  )
}