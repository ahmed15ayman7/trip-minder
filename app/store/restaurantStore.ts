import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Restaurant } from '../restaurants/[id]/page';

interface RestaurantStore {
    restaurants: Restaurant[];
    addRestaurant: (restaurant: Restaurant) => void;
    removeRestaurant: (id: number) => void;
    clearRestaurants: () => void;
    getTotalPrice: () => number;
}

export const useRestaurantStore = create<RestaurantStore>()(
    persist(
        (set, get) => ({
            restaurants: [],
            addRestaurant: (restaurant) => {
                const currentRestaurants = get().restaurants;
                const exists = currentRestaurants.some(r => r.id === restaurant.id);
                if (!exists) {
                    set({ restaurants: [...currentRestaurants, restaurant] });
                }
            },
            removeRestaurant: (id) => {
                set({ restaurants: get().restaurants.filter(r => r.id !== id) });
            },
            clearRestaurants: () => {
                set({ restaurants: [] });
            },
            getTotalPrice: () => {
                return get().restaurants.reduce((total, restaurant) => total + restaurant.averagePricePerAdult, 0);
            },
        }),
        {
            name: 'restaurant-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
); 