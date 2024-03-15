<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{
  product: Product
}>()

</script>
<template>
  <div class="card">
    <div class="card-img">
      <img :src="product.images[0]" alt="card image" width="200px" height="100px" />
    </div>
    <div>
      <h2 class="card-title">{{ product.title }}</h2>
      <p class="card-description">{{ product.description }}</p>
      <div>
        <span class="card-info card-info--discount"
          >Discount {{ product.discountPercentage }} %</span
        >
        <span class="card-info">{{ product.brand }}</span>
      </div>
      <div>
        <span class="card-info">${{ product.price }}</span>
        <span class="card-info">⭐{{ product.rating }}</span>
        <span class="card-badge">{{ product.category }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.card {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &-img {
    max-width: 200px;
    max-height: 100px;
    margin-right: 20px;
  }
  h2 {
    font-weight: 700;
  }
  &-description {
    font-size: 14px;
    color: #0c0c0c;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &-info {
    font-size: 16px;
    color: #409b9e;
    font-weight: 700;

    margin-right: 20px;

    &--discount {
      color: red;
      font-size: 14px;
    }
  }

  &-badge {
    display: inline-block;
    background-color: #0f2a15;
    color: #2d9a45;
    font-size: 11px;
    border-radius: 20px;
    padding: 2px 6px 3px;
    text-align: center; /* Выравниваем текст по центру */
  }
}
</style>
