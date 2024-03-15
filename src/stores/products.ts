import type { Product } from '@/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

interface ProductsStore {
  products: Ref<Product[]>
  // searchedProducts: Ref<Product>|null
  productIndex: Ref<number>
  isLoading: Ref<boolean>
  getAllProducts: (limit?: number) => void
  getProducts: (number: number) => Product[]
  searchProducts: (name: string) => Product[] | []
}

export const useProductsStore = defineStore('products', (): ProductsStore => {
  const products = ref([
    {
      brand: '',
      category: '',
      description: '',
      title: '',
      discountPercentage: 0,
      id: 0,
      images: [''],
      price: 0,
      rating: 0,
      stock: 0,
      thumbnail: ''
    }
  ])

  const productIndex = ref(0)

  // const searchedProducts = ref(null)

  const isLoading = ref(false)

  const getAllProducts = async (limit = 100) => {
    try {
      const data = await fetch(`https://dummyjson.com/products?limit=${limit}`).then((res) =>
        res.json()
      )
      products.value = data.products
      isLoading.value = false
    } catch (error) {
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
      isLoading.value = true
      // get next product from main array of products
      const nextPost = products.value[productIndex.value]
      newProducts.push(nextPost)
      productIndex.value++ // increase index
    }
    return newProducts
  }

  const searchProducts = (name: string) => {
    return products.value.find((product) => product.title === name)
  }

  return { products, productIndex, isLoading, getAllProducts, getProducts, searchProducts }
})
