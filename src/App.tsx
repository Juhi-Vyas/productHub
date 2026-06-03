import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ProductHub
            </h1>
          </Link>

          <Link
            to="/"
            className="px-4 py-2 rounded-xl bg-white shadow hover:shadow-md transition"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}