import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { GlobalContext } from '../../contexts/global.context';

function Profile() {
  const { state } = useContext(GlobalContext);

  const getEmail = () => {
    const localStorageData = localStorage.getItem('user');
    let jsonData = '';
    if (localStorageData) {
      jsonData = JSON.parse(localStorageData).email;
    }
    return state.user.email || jsonData;
  };

  const navigate = useNavigate();

  const redirect = (url: string) => navigate(`/${url}-recipes`);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Header
        pageTitle="Profile"
        searchIcon={ false }
      />
      <div data-testid="profile-email">{ `${getEmail()}` }</div>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => redirect('done') }
      >
        Done Recipes

      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => redirect('favorite') }
      >
        Favorite Recipes

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Logout

      </button>
    </>

  );
}
export default Profile;
