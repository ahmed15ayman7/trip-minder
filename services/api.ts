// services/api.ts
import axios from "axios";

export const baseUrl = "https://a64e-105-196-167-243.ngrok-free.app";
export const FoodCategories = {
  Seafood: 1,
  "Grilled Food & Steaks": 2,
  "European cuisine": 3,
  "Asian cuisine": 4,
  "Japanese cuisine (Sushi)": 5,
  "Fast Food": 6,
  "Nubian cuisine": 7,
  Snacks: 8,
  "Levantine cuisine (Lebanese)": 9,
  "Oriental & Egyptian Cuisine": 10,
  "Traditional & Home-Style Food": 11,
};
export const classABCD = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
};
export const AccomodationTypes = {
  Villa: 1,
  Hotel: 2,
  Chalet: 3,
  Apartment: 4,
  Hostel: 5,
};
export const fetchAccommodations = async () => {
  try {
    const response = await axios.get("/api/accommodation");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchRestaurants = async () => {
  try {
    const response = await axios.get("/api/restaurants");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchEntertainment = async (zoneId: number) => {
  try {
    const response = await axios.get(`/api/entertainment/zone/${zoneId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchTourismArea = async (zoneId: number) => {
  try {
    const response = await axios.get(`/api/tourismarea/zone/${zoneId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchZones = async () => {
  try {
    const response = await axios.get("/api/zone");
    // console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchGovernorates = async () => {
  try {
    const response = await axios.get(`${baseUrl}Api/v1/city/list`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
