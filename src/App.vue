<template>
  <div class="container">
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Menu</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>

    <header>
      <div class="slider-container">
        <div class="slider" :style="sliderStyles">
          <div
            class="slide"
            v-for="(image, index) in sliderImages"
            :key="index"
          >
            <img :src="image" alt="Slider Image" :style="slideStyles(index)" />
          </div>
        </div>
        <div class="arrow arrow-left" @click="slideLeft">&#8249;</div>
        <div class="arrow arrow-right" @click="slideRight">&#8250;</div>
      </div>
    </header>

    <main>
      <h1>Welcome to Our Restaurant</h1>
      <p>Enjoy delicious meals and great ambiance.</p>
      <select v-model="selectedCategory" @change="fetchMeals">
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </main>

    <div class="columns">
      <div class="column" v-for="meal in meals" :key="meal.idMeal">
        <div class="product">
          <img :src="meal.strMealThumb" :alt="meal.strMeal" />
          <h3>{{ meal.strMeal }}</h3>
          <p>{{ meal.strCategory }}</p>
          <p>{{ meal.strArea }}</p>
          <button class="add-to-cart" @click="addToCart(meal)">
            Add to Cart
          </button>
          <button class="view-details" @click="viewDetails">Details</button>
        </div>
      </div>
    </div>
    <router-view :cartItems="cartItems" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      sliderImages: [
        require("@/assets/img/food-1.jpg"),
        require("@/assets/img/food-2.jpg"),
        require("@/assets/img/food-3.jpg"),
        require("@/assets/img/food-4.jpg"),
        require("@/assets/img/food-5.jpg"),
        require("@/assets/img/food-6.jpg"),
        require("@/assets/img/food-7.jpg"),
        require("@/assets/img/food-8.jpg"),
      ],
      currentSlide: 0,
      intervalId: null,
      selectedCategory: "", // Kategori yang dipilih pada navbar
      categories: [], // Daftar kategori makanan
      meals: [], // Daftar makanan yang diterima dari API
      cartItems: [],
    };
  },
  computed: {
    sliderStyles() {
      return {
        transform: `translateX(-${this.currentSlide * 100}%)`,
        transitionDuration: "0.8s", // Mengatur durasi perpindahan gambar menjadi lebih lambat
      };
    },
  },
  mounted() {
    this.startSliderInterval();
    this.fetchCategories(); // Memuat daftar kategori saat komponen di-mount
    this.fetchMeals(); // Memuat daftar makanan saat komponen di-mount
  },
  beforeUnmount() {
    this.stopSliderInterval();
  },
  methods: {
    slideLeft() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      } else {
        this.currentSlide = this.sliderImages.length - 1;
      }
    },
    slideRight() {
      if (this.currentSlide < this.sliderImages.length - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0;
      }
    },
    slideTo(index) {
      this.currentSlide = index;
    },
    slideStyles(index) {
      const transitionDelay = this.currentSlide === index ? "0s" : "0.3s";
      return {
        transitionDelay,
      };
    },
    startSliderInterval() {
      this.intervalId = setInterval(() => {
        this.slideRight();
      }, 5000);
    },
    stopSliderInterval() {
      clearInterval(this.intervalId);
    },

    addToCart(meal) {
      // Logika untuk menambahkan barang ke dalam keranjang
      this.cartItems.push(meal);

      // Tampilkan alert
      alert("Makanan sudah masuk ke dalam keranjang!");

      // Navigasikan ke halaman keranjang dengan mengirimkan data cartItems melalui rute
      this.$router.push({
        path: "/cart",
        params: { cartItems: this.cartItems },
      });
    },

    viewDetails() {
      // Logika untuk menampilkan detail produk
    },
    fetchCategories() {
      // Memanggil themealdb API untuk mendapatkan daftar kategori makanan
      // Gunakan endpoint yang sesuai untuk mengambil kategori
      // Misalnya, menggunakan axios library:
      axios
        .get("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((response) => {
          this.categories = response.data.categories.map(
            (category) => category.strCategory
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchMeals() {
      // Memanggil themealdb API untuk mendapatkan daftar makanan berdasarkan kategori yang dipilih
      // Gunakan endpoint yang sesuai untuk mengambil makanan berdasarkan kategori
      // Misalnya, menggunakan axios library:
      let apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
      if (this.selectedCategory) {
        apiUrl += this.selectedCategory;
      }

      axios
        .get(apiUrl)
        .then((response) => {
          this.meals = response.data.meals;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

nav {
  background-color: #f2f2f2;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
}

ul {
  list-style: none;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
}

li {
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: #333;
}

header {
  position: relative;
}

.slider-container {
  position: relative;
  overflow: hidden;
  height: 400px;
}

.slider {
  display: flex;
  transition: transform 0.8s ease-in-out; /* Mengatur durasi perpindahan gambar menjadi lebih lambat */
}

.slide {
  flex: 0 0 100%;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.arrow:hover {
  background-color: rgba(0, 0, 0, 0.6);
}

.arrow-left {
  left: 10px;
}

.arrow-right {
  right: 10px;
}

main {
  margin-top: 40px;
  text-align: center;
}

h1 {
  font-size: 36px;
}

p {
  font-size: 18px;
  color: #777;
}

.columns {
  display: flex;
  flex-wrap: wrap; /* Reverse the order of wrapping */
  justify-content: flex-start; /* Align columns to the left */
  margin-top: 40px;
}

.column {
  flex-basis: calc(22% - 4px);
  background-color: #f2f2f2;
  padding: 20px;
  margin-bottom: 20px;
}

.product {
  text-align: center;
}

.product img {
  width: 100%; /* Adjust the width to your desired size, e.g., 80% */
  height: auto;
  margin-bottom: 10px;
}

.product h3 {
  font-size: 18px;
}

.product p {
  font-size: 16px;
  margin-bottom: 10px;
}

.product button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.product button:last-child {
  background-color: #008cba;
}

.product .add-to-cart {
  margin-bottom: 10px;
  margin-right: 10px;
}

.product .view-details {
  margin-bottom: 10px;
  margin-top: 10px;
}

select {
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
}

select:hover {
  border-color: #888;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.3);
}
</style>
