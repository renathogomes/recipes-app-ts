import { useState } from 'react';
import { FoodService } from '../../services/services';
import { SearchType } from '../../types/types';

export default function SearchInput() {
  const [searchType, setSearchType] = useState<SearchType>('s');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value as SearchType);
  };

  const handleClick = async () => {
    if (searchType === 'f' && searchTerm.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }
    const result = await FoodService('meal').search(searchType, searchTerm);
    console.log(result);
  };

  return (
    <>
      <div>
        <input
          checked={ searchType === 'i' }
          type="radio"
          id="ingredient"
          name="search"
          value="i"
          data-testid="ingredient-search-radio"
          onChange={ handleSearchTypeChange }
        />
        <label htmlFor="ingredient">Ingredient</label>
        <input
          checked={ searchType === 's' }
          type="radio"
          id="name"
          name="search"
          value="s"
          data-testid="name-search-radio"
          onChange={ handleSearchTypeChange }
        />
        <label htmlFor="name">Name</label>
        <input
          checked={ searchType === 'f' }
          type="radio"
          id="first-letter"
          name="search"
          value="f"
          data-testid="first-letter-search-radio"
          onChange={ handleSearchTypeChange }
        />
        <label htmlFor="first-letter">First letter</label>
      </div>
      <input
        value={ searchTerm }
        data-testid="search-input"
        type="text"
        placeholder="Buscar Receita"
        onChange={ handleSearchTermChange }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </>

  );
}
