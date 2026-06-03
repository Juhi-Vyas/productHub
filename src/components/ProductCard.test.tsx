import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProductCard from './ProductCard'

const product = {
  id: 1,
  title: 'Test Product',
  price: 9.99,
  description: 'desc',
  category: 'cat',
  image: 'https://via.placeholder.com/150',
  rating: { rate: 4.5, count: 10 }
}

describe('ProductCard', () => {
  it('renders', () => {
    const { getByText } = render(<ProductCard product={product as any} />)
    expect(getByText('Test Product')).toBeTruthy()
  })
})
