import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../types'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    setLoading(true)

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((r) => r.json())
      .then((d) => setProduct(d))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center text-gray-500 py-20">
        No product found
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-10 p-8">
        <div className="lg:w-1/2 bg-slate-50 rounded-2xl flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 object-contain hover:scale-105 transition duration-500"
          />
        </div>

        <div className="flex-1">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium capitalize">
            {product.category}
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-800">
            {product.title}
          </h2>

          <div className="mt-5 text-4xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </div>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
            {product.rating?.rate ?? 'N/A'}
            <span className="text-gray-500">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <p className="mt-8 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <button className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}