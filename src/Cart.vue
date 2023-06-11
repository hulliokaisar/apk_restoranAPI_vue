<template>
  <div class="cart-container">
    <h2>Barang dalam Keranjang</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.idMeal">
        {{ item.strMeal }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CartContainer',
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.cart-container {
  margin-top: 40px;
}
</style>
