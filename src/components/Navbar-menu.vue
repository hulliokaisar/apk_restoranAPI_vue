<template>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Menu</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
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
    </ul>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedCategory: "", // Kategori yang dipilih pada navbar
      categories: [], // Daftar kategori makanan
      meals: [], // Daftar makanan yang diterima dari API
    };
  },
  mounted() {
    this.fetchCategories(); // Memuat daftar kategori saat komponen di-mount
    this.fetchMeals(); // Memuat daftar makanan saat komponen di-mount
  },
  methods: {
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
</style>
