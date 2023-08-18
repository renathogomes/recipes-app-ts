import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';

// não vi sentindo em criar as páginas agora logo no inicio do projeto so para passar no teste, então preferi
// criar as rotas dessa forma, e quando for necessário criar as páginas somente lembrar de passar o componente
// Header com o titulo da página e o argumento searchIcon como false para não aparecer o icone de pesquisa
// nas páginas que não precisam dele conforme o exposto abaixo nas paginas requeridas pelo projeto

function App() {
  return (
    <Routes>
      <Route path="/" element={ <h1>home</h1> } />
      <Route path="/meals" element={ <Header pageTitle="Meals" /> } />
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
