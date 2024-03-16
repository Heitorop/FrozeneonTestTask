<script setup lang="ts">
import Search from '@/components/Search/index.vue'
import Posts from '@/components/Posts/index.vue'
import { useProductsStore } from './stores/products'
import { storeToRefs } from 'pinia'

// STORES
const storeProducts = useProductsStore()

// STATE
const { error } = storeToRefs(storeProducts)

</script>

<template>
  <main>
    <Search />
    <Posts />
    <p v-if="error">Error: {{ error }}</p>
  </main>
</template>

<style scoped lang="scss"></style>
