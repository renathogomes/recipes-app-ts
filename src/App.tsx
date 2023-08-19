import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Recipes /> } />
      <Route path="/drinks" element={ <Header pageTitle="Drinks" /> } />
      <Route path="/meals/:id-da-receita" element={ <h2>meal details</h2> } />
      <Route path="/drinks/:id-da-receita" element={ <h2>drink details</h2> } />
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
