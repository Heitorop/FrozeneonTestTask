<script setup lang="ts">
import Card from '@/components/Card/index.vue'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'

// STORE
const storeProduts = useProductsStore()

// STATE
const { productIndex } = storeToRefs(storeProduts)

// COMPUTED
const newPosts = computed(() => storeProduts.getProducts(5))
// const searchedProducts = computed(() => storeProduts.searchedProducts)

// VARIABLES
const posts = ref(newPosts.value)
const scrollComponent = ref(null)

onMounted(() => {
  storeProduts.$patch({ productIndex: 0 })
  loadMorePosts()
})

const loadMorePosts = () => {
  if (productIndex.value === 100) {
    return
  }
  storeProduts.getProducts(5)
  setTimeout(() => {
    posts.value.push(...newPosts.value)
    storeProduts.$patch({ isLoading: false })
  }, 300)
}

const handleScroll = () => {
  let element: HTMLElement | null = scrollComponent.value
  if (element!.scrollTop + element!.clientHeight >= element!.scrollHeight - 10) {
    loadMorePosts()
  }
}
</script>
<template>
  <div class="posts-wrapper" ref="scrollComponent" @scroll="handleScroll">
    <Card v-for="(product, index) in posts" :product="product" :key="index" />
  </div>
</template>

<style scoped lang="scss">
.posts-wrapper {
  max-height: 450px;
  text-overflow: ellipsis;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  overflow-y: scroll;
}
</style>
