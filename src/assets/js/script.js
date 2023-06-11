import Navbar from "./components/Navbar-menu.vue";
import axios from 'axios';

export default {
  name: "App",
  components: {
    Navbar,
  },
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
    addToCart() {
      // Logika untuk menambahkan produk ke keranjang belanja
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
