import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes';
import { RecipeScope } from './types/recipe';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import { Footer } from './components/Footer/Footer';
import RecipeInProgress from './pages/RecipeInProgress/RecipeInProgress';
import Profile from './pages/Profile/Profile';
import { CONTEXT_INITIAL_STATE, GlobalContextProvider } from './contexts/global.context';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';

function App() {
  const location = useLocation();
  const hasFooter = location.pathname
    .startsWith('/meals') || location.pathname
    .startsWith('/drinks') || location.pathname
    .startsWith('/profile');

  return (
    <GlobalContextProvider value={ CONTEXT_INITIAL_STATE }>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Recipes scope={ 'meals' as RecipeScope } /> } />
        <Route path="/drinks" element={ <Recipes scope={ 'drinks' as RecipeScope } /> } />
        <Route
          path="/meals/:recipeId"
          element={ <RecipeDetails scope={ 'meals' as RecipeScope } /> }
        />
        <Route
          path="/drinks/:recipeId"
          element={ <RecipeDetails scope={ 'drinks' as RecipeScope } /> }
        />
        <Route
          path="/meals/:recipeId/in-progress"
          element={ <RecipeInProgress scope={ 'meals' as RecipeScope } /> }
        />
        <Route
          path="/drinks/:recipeId/in-progress"
          element={ <RecipeInProgress scope={ 'drinks' as RecipeScope } /> }
        />
        <Route
          path="/profile"
          element={
            <Profile />
          }
        />
        <Route
          path="/done-recipes"
          element={
            <DoneRecipes />
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
      { hasFooter && <Footer /> }
    </GlobalContextProvider>
  );
}

export default App;
