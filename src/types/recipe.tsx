import { Dispatch, SetStateAction } from 'react';

export type RecipeSearchType = 'i' | 's' | 'f';

export enum RecipeSearchTypeEnum {
  i = 'Ingredient',
  s = 'Name',
  f = 'First letter',
}

export type RecipeSearchParams = {
  type: RecipeSearchType;
  term: string;
};

export type RecipeScope = 'meals' | 'drinks';

export type RecipeContextState = {
  state: {
    scope: RecipeScope;
    searchParams: RecipeSearchParams;
    recipes: any[]; // TODO create recipe type,
  }
  update: Dispatch<SetStateAction<RecipeContextState>>;
};
