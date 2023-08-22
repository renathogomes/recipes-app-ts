import { useContext } from 'react';
import Header from '../../components/Header';
import { GlobalContext } from '../../contexts/global.context';

function Profile() {
  const { state } = useContext(GlobalContext);
  return (
    <>
      <Header
        pageTitle="Profile"
        searchIcon={ false }
      />
      <div data-testid="profile-email">{state.user.email}</div>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </>

  );
}
export default Profile;
