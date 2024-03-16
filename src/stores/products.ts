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
      const data = await fetch(`https://dummyjson.com/products?limit=${limit}`).then((res) =>
        res.json()
      )
      products.value = data.products
      isLoading.value = false
    } catch (e) {
      error.value = (e as Error).message
      console.log(error)
    }
  }

  const getProducts = (number: number) => {
    const newProducts = []
    for (
      let i = 0;
      i < number && productIndex.value < products.value.length && products.value.length > 1;
      i++
    ) {
      // get next product from main array of products
      const nextPost = products.value[productIndex.value]
      newProducts.push(nextPost)
      productIndex.value++ // increase index
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
