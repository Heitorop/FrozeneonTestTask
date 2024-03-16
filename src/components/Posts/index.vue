<script setup lang="ts">
import type { Product } from '@/types'
import { useProductsStore } from '@/stores/products'
import { LIMIT_OF_PRODUCTS, NUMBER_OF_PRODUCTS } from '@/utils/constants'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue'
import Card from '@/components/Card/index.vue'
import NotFound from '@/components/NotFound/index.vue'

import Spinner from '@/ui/Spinner/Spinner.vue'
// STORE
const storeProducts = useProductsStore()

// STATE
const { productIndex, isLoading, searchValue } = storeToRefs(storeProducts)

// COMPUTED
const searchedProducts = computed(() => storeProducts.searchedProducts)

// VARIABLES
const posts = ref<Product[]>([])
const scrollComponent = ref(null)

onMounted(() => {
  storeProducts.$patch({ productIndex: 0 })
  loadMorePosts()
})

watch(
  () => searchedProducts.value,
  (newProducts) => {
    if (newProducts.length === 0) {
      storeProducts.$patch({ productIndex: 0 })
      posts.value = storeProducts.getProducts(NUMBER_OF_PRODUCTS)
    } else {
      posts.value = newProducts
    }
  }
)

const loadMorePosts = () => {
  storeProducts.$patch({ isLoading: true })
  if (productIndex.value === LIMIT_OF_PRODUCTS) {
    storeProducts.$patch({ isLoading: false })
    return
  }

  setTimeout(() => {
    posts.value.push(...storeProducts.getProducts(NUMBER_OF_PRODUCTS))
    storeProducts.$patch({ isLoading: false })
  }, 500)
}

const handleScroll = () => {
  let element: HTMLElement | null = scrollComponent.value
  if (element!.scrollTop + element!.clientHeight >= element!.scrollHeight - 1 && !searchedProducts.value.length) {
    loadMorePosts()
  }
}
</script>
<template>
  <div class="posts-wrapper" ref="scrollComponent" @scroll="handleScroll">
    <transition-group name="list">
      <NotFound v-if="searchValue && searchedProducts.length === 0 && !isLoading" />
      <Card v-else v-for="(product, index) in posts" :product="product" :key="index" />
      <Spinner v-if="isLoading" />
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.posts-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 450px;
  text-overflow: ellipsis;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  overflow: hidden;
  overflow-y: scroll;

  @media (width <= 768px) {
    align-items: center;
  }
}
</style>
