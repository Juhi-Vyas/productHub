import { describe, it, expect } from 'vitest'
import productsReducer, { fetchProducts } from './productsSlice'

describe('products slice', () => {
  it('should return the initial state', () => {
    const state = productsReducer(undefined as any, { type: '' })
    expect(state.items).toBeDefined()
  })
})
