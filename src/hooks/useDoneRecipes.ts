import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../contexts/global.context';

function useDoneRecipes() {
  const state = useContext(GlobalContext);
  const { doneRecipes } = state.state;
  const [isShared, setIsShared] = useState('');

  const handleShare = (type: string, id: string) => {
    const { location: { origin } } = window;
    const url = `${origin}/${type}s/${id}`;
    navigator.clipboard.writeText(url);
    setIsShared(`${id}`);
  };

  return { isShared, handleShare };
}

export default useDoneRecipes;
