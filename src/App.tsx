import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes';
import { RecipeScope } from './types/recipe';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import { Footer } from './components/Footer/Footer';

function App() {
  const location = useLocation();
  const hasFooter = location.pathname
    .startsWith('/meals') || location.pathname
    .startsWith('/drinks') || location.pathname
    .startsWith('/profile');

  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Recipes scope={ 'meals' as RecipeScope } /> } />
        <Route path="/drinks" element={ <Recipes scope={ 'drinks' as RecipeScope } /> } />
        <Route path="/meals/:recipeId" element={ <RecipeDetails /> } />
        <Route path="/drinks/:recipeId" element={ <RecipeDetails /> } />
        <Route
          path="/meals/:recipeId/in-progress"
          element={ <h2>meal in progress</h2> }
        />
        <Route
          path="/drinks/:recipeId/in-progress"
          element={ <h2>drink in progress</h2> }
        />
        <Route
          path="/profile"
          element={
            <Header
              pageTitle="Profile"
              searchIcon={ false }
            />
        }
        />
        <Route
          path="/done-recipes"
          element={
            <Header
              pageTitle="Done Recipes"
              searchIcon={ false }
            />
        }
        />
        <Route
          path="/favorite-recipes"
          element={
            <Header
              pageTitle="Favorite Recipes"
              searchIcon={ false }
            />
        }
        />
      </Routes>
      {hasFooter && <Footer />}
    </>

  );
}

export default App;
