import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home'
import Pokemon from './routes/Pokemon';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pokemon/:pokedex_id' element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
