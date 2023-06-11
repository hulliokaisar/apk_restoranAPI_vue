import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Cart from './Cart.vue';

const routes = [
  {
    path: '/cart',
    component: Cart,
    props: (route) => ({ cartItems: route.params.cartItems }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
