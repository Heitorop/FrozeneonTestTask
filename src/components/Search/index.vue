<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

// STORE
const storeProducts = useProductsStore()

// STATE
const search = ref('')
const { isLoading } = storeToRefs(storeProducts)
const debounce = (fn: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: string[]) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const debouncedSearch = debounce((newValue: string) => {
  if (newValue !== '' && !isLoading.value) {
    storeProducts.searchProducts(newValue)
  } else {
    storeProducts.$patch({ searchedProducts: [] })
  }
  storeProducts.$patch({ searchValue: newValue })
}, 300)

watch(
  () => search.value,
  (newValue) => {
    debouncedSearch(newValue)
  }
)
</script>
<template>
  <input class="search" placeholder="Find your product" v-model="search" type="text" />
</template>

<style scoped lang="scss">
.search {
  height: 3rem;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  padding-left: 5px;
}
</style>
