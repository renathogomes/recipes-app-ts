import { useContext } from 'react';
import Header from '../../components/Header';
import { GlobalContext } from '../../contexts/global.context';

function Profile() {
  const { state } = useContext(GlobalContext);
  const getEmail = state.user.email
  || JSON.parse(localStorage.getItem('user') ?? '').email;
  return (
    <>
      <Header
        pageTitle="Profile"
        searchIcon={ false }
      />
      <div data-testid="profile-email">{getEmail}</div>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </>

  );
}
export default Profile;
