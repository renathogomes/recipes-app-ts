import { Recipe } from './recipe';

export type User = {
  email: string;
};
export type GlobalContextType = {
  state: GlobalContextState,
  update: (data: Partial<GlobalContextState>) => void;
};
export type GlobalContextState = {
  user: User;
  favoriteRecipes: Recipe[];
  finishedRecipes: Recipe[];
  inProgressRecipes: Recipe[];
};
