<script setup lang="ts">
import Search from '@/components/Search/index.vue'
import Posts from '@/components/Posts/index.vue'
import { onMounted } from 'vue'
import { useProductsStore } from './stores/products'
import { LIMIT_OF_PRODUCTS } from './utils/constants'
import { storeToRefs } from 'pinia'

// STORES
const storeProducts = useProductsStore()

// STATE
const { error } = storeToRefs(storeProducts)

onMounted(() => {
  storeProducts.$patch({ isLoading: true })
  storeProducts.getAllProducts(LIMIT_OF_PRODUCTS)
})
</script>

<template>
  <main>
    <Search />
    <Posts />
    <p v-if="error">Error: {{ error }}</p>
  </main>
</template>

<style scoped lang="scss"></style>
