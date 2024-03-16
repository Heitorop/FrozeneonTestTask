import type { Product } from '@/types'
import { LIMIT_OF_PRODUCTS, NUMBER_OF_PRODUCTS } from '@/utils/constants'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

interface ProductsStore {
  products: Ref<Product[]>
  // searchedProducts: Ref<Product>|null
  productIndex: Ref<number>
  searchedProducts: Ref<Product[]>
  searchValue: Ref<string>
  isLoading: Ref<boolean>
  error: Ref<string>
  getAllProducts: (limit?: number) => void
  getProducts: (number: number) => Product[]
  searchProducts: (name: string) => void
}

export const useProductsStore = defineStore('products', (): ProductsStore => {
  const products = ref<Product[]>([])

  const searchedProducts = ref<Product[]>([])

  const searchValue = ref('')

  const productIndex = ref(0)

  const isLoading = ref(false)

  const error = ref('')

  const getAllProducts = async (limit = LIMIT_OF_PRODUCTS) => {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=${limit}`)
      const data = await response.json()
      if (!response.ok) {
        throw new Error('Something with server')
      }
      products.value = data.products
      isLoading.value = false
    } catch (e) {
      error.value = (e as Error).message
      console.error(error)
    }
  }

  const getProducts = (number: number) => {
    const newProducts = []
    if (productIndex.value < products.value.length) {
      newProducts.push(...products.value.slice(productIndex.value, productIndex.value + number))

      productIndex.value += newProducts.length
    }

    return newProducts
  }

  const searchProducts = (name: string) => {
    searchedProducts.value = products.value.filter((product) =>
      product.title.toLowerCase().includes(name.toLowerCase())
    )
  }

  return {
    products,
    searchedProducts,
    searchValue,
    productIndex,
    isLoading,
    error,
    getAllProducts,
    getProducts,
    searchProducts
  }
})
