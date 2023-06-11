import axios from "axios";

const API_KEY = "YOUR_API_KEY"; // Ganti dengan kunci API Anda

export const getRandomMeal = async () => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/random.php?api_key=${API_KEY}`
    );
    return response.data.meals[0];
  } catch (error) {
    console.error("Error fetching random meal:", error);
    return null;
  }
};

export const searchMealByName = async (mealName) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?api_key=${API_KEY}&s=${mealName}`
    );
    return response.data.meals;
  } catch (error) {
    console.error("Error searching meal by name:", error);
    return [];
  }
};

export const searchMealByCategory = async (category) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?api_key=${API_KEY}&c=${category}`
    );
    return response.data.meals;
  } catch (error) {
    console.error("Error searching meal by category:", error);
    return [];
  }
};
