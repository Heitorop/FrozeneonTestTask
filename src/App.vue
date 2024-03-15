<script setup lang="ts">
import Search from '@/components/Search/index.vue'
import Posts from '@/components/Posts/index.vue'
import { onMounted } from 'vue'
import { useProductsStore } from './stores/products'

// STORES
const storeProducts = useProductsStore()

onMounted(() => {
  storeProducts.$patch({ isLoading: true })
  storeProducts.getAllProducts()
})
</script>

<template>
  <main>
    <Search />
    <Posts  />
  </main>
</template>

<style scoped lang="scss"></style>
