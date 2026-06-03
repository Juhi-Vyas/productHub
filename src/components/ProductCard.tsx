import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-64 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-5">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 capitalize">
            {product.category}
          </span>

          <h3 className="mt-3 text-gray-800 font-semibold line-clamp-2 min-h-[56px]">
            {product.title}
          </h3>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>

            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              {product.rating?.rate ?? 'N/A'}
            </span>
          </div>

          <button className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition">
            View Details
          </button>
        </div>
      </Link>
    </div>
  )
}