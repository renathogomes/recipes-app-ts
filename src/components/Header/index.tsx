import { useState } from 'react';
import ProfileButton from './ProfileButton';
import SearchButton from './SearchButton';
import SearchInput from '../SearchBar';

type HeaderProps = {
  pageTitle: string;
  searchIcon?: boolean;
};

export default function Header({ pageTitle, searchIcon = true }: HeaderProps) {
  const [searchOn, setSearchOn] = useState(false);

  return (
    <header>
      <ProfileButton />
      { searchIcon && <SearchButton barVisible={ () => setSearchOn(!searchOn) } /> }
      { searchOn && <SearchInput /> }
      <h1 data-testid="page-title">{ pageTitle }</h1>
    </header>
  );
}
