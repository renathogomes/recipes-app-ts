import { Category, Recipe, RecipeScope, RecipeSearchType } from '../types/recipe';

export const FoodService = (food: RecipeScope) => {
  const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
  const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1';
  const BASE_URL = food === 'meals' ? MEAL_URL : DRINK_URL;

  return {
    search: async (type: RecipeSearchType, term: string): Promise<Recipe[]> => {
      const response = await fetch(`${BASE_URL}/${type === 'i'
        ? 'filter' : 'search'}.php?${type}=${term}`);
      const data = await response.json();
      return data[food] ?? [];
    },
    getById: async (id?: string): Promise<Recipe> => {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      const data = await response.json();
      return data[food];
    },
    getCategories: async (): Promise<Category[]> => {
      const response = await fetch(`${BASE_URL}/list.php?c=list`);
      const data = await response.json();
      return data[food] ?? [];
    },
    getByCategory: async (category: string): Promise<Recipe[]> => {
      const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
      const data = await response.json();
      console.log('getByCategory', data);
      return data[food] ?? [];
    },
  };
};
