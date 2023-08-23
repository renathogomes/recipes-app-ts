import { useState } from 'react';
import ProfileButton from './ProfileButton';
import SearchButton from './SearchButton';
import style from './Header.module.css';
import trayImg from '../../images/tray.svg';
import mealImg from '../../images/mealIcon2.svg';
import SearchInput from '../SearchBar';

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
          <ProfileButton />
        </div>
      </div>
      { searchOn && <SearchInput /> }
    </header>
  );
}
