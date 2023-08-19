import { SearchType } from '../types/types';

export const FoodService = (food: 'meal' | 'drink') => {
  const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
  const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1';
  const BASE_URL = food === 'meal' ? MEAL_URL : DRINK_URL;

  return {
    search: async (type: SearchType, term: string) => {
      const response = await fetch(`${BASE_URL}/${type === 'i'
        ? 'filter' : 'search'}.php?${type}=${term}`);
      const data = await response.json();
      return data;
    },
    getById: async (id: string) => {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      const data = await response.json();
      return data;
    },
  };
};
