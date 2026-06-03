import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchProducts } from '../slices/productsSlice'
import ProductCard from '../components/ProductCard'

const PAGE_SIZE = 10

export default function ProductListPage() {
  const dispatch = useAppDispatch()
  const { items, status } = useAppSelector((s) => s.products)

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('none')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (status === 'idle' && items.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, status, items.length])

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category))
    return ['All', ...Array.from(set)]
  }, [items])

  const filtered = useMemo(() => {
    let list = items

    if (query) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (category !== 'All') {
      list = list.filter((p) => p.category === category)
    }

    if (sort === 'asc') {
      list = list.slice().sort((a, b) => a.price - b.price)
    }

    if (sort === 'desc') {
      list = list.slice().sort((a, b) => b.price - a.price)
    }

    return list
  }, [items, query, category, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  useEffect(() => {
    setPage(1)
  }, [query, category, sort])

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'none' | 'asc' | 'desc')}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="none">Sort By</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {status === 'loading' && (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {status === 'failed' && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center">
          Failed to load products.
        </div>
      )}

      {/* Products Grid */}
      {status !== 'loading' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {pageItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No products found.
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
          className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          ← Previous
        </button>

        <div className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium">
          Page {page} of {totalPages}
        </div>

        <button
          onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
          disabled={page === totalPages}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  )
}