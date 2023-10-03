import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './views/Landing/Landing.jsx';
import Home from './views/Home/Home.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';
import Form from './views/Form/Form';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/videogames/:idVideogame' element={ <GameDetail /> }/>
        <Route path='/form' element={ <Form /> }/>
      </Routes>
    </div>
  );
}

export default App;
