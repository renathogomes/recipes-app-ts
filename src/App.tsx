import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes';
import { RecipeScope } from './types/recipe';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Recipes scope={ 'meals' as RecipeScope } /> } />
      <Route path="/drinks" element={ <Recipes scope={ 'drinks' as RecipeScope } /> } />
      <Route path="/meals/:recipeId" element={ <RecipeDetails /> } />
      <Route path="/drinks/:recipeId" element={ <RecipeDetails /> } />
      <Route
        path="/meals/:id-da-receita/in-progress"
        element={ <h2>meal in progress</h2> }
      />
      <Route
        path="/drinks/:id-da-receita/in-progress"
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
  );
}

export default App;
