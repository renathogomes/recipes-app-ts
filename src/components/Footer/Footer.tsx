import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import style from './Footer.module.css';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      data-testid="footer"
      className={ style.footer }
    >
      <button onClick={ () => navigate('/drinks') }>
        <img
          className={ style.footer }
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
        />
      </button>
      <button onClick={ () => navigate('/meals') }>
        <img
          className={ style.menufooter }
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="meal icon"
        />
      </button>
    </footer>
  );
}
