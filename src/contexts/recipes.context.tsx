import { createContext, useState } from 'react';
import { RecipeContextState } from '../types/recipe';

export const CONTEXT_INITIAL_STATE: RecipeContextState = {
  state: {
    scope: 'meals',
    searchParams: {
      term: '',
      type: 's',
    },
    recipes: [],
  },
  update: () => {},
};

export const RecipeContext = createContext(CONTEXT_INITIAL_STATE);

export function RecipeContextProvider({ value, children }: any) {
  const [state, update] = useState({ ...CONTEXT_INITIAL_STATE, ...value });

  return (
    <RecipeContext.Provider value={ { ...state, update } }>
      {children}
    </RecipeContext.Provider>
  );
}
