import { useState } from 'react';
import ProfileButton from './ProfileButton';
import SearchButton from './SearchButton';
import SearchInput from '../SearchBar';
import style from './Header.module.css';
import trayImg from '../../images/tray.svg';
import mealImg from '../../images/mealIcon2.svg';
import SearchBar from '../SearchBar';

type HeaderProps = {
  pageTitle: string;
  searchIcon?: boolean;
};

export default function Header({ pageTitle, searchIcon = true }: HeaderProps) {
  const [searchOn, setSearchOn] = useState(false);
  return (
    <header className={ style.headerContainer }>
      <div className={ style.TopHeaderContainer }>
        <div className={ style.headerTitle }>
          <img src={ trayImg } alt="meal icon" />
          <h1
            data-testid="page-title"
            className={ style.heading }
          >
            <span className={ style.subtitleSpan }>app</span>
            {' '}
            <span className={ style.titleSpan }>receitas</span>
          </h1>
        </div>
        <div className={ style.icons }>
          { searchIcon && <SearchButton barVisible={ () => setSearchOn(!searchOn) } /> }
          {/* { searchOn && <SearchInput /> } nesse ponto substitui pelo código da linha 41 pra implementar o css do searchbar */}
          <ProfileButton />
        </div>
      </div>
      <div className={ style.bottomHeaderContainer }>
        <img src={ mealImg } alt="" />
        <h2 className={ style.bottomHeading }>Refeições</h2>
      </div>
      { searchOn && <SearchBar />}
    </header>
  );
}
