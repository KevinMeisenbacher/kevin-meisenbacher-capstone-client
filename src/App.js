import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import SelectionPage from './pages/SelectionPage/SelectionPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';

function App() {
  const [selected, setSelected] = useState(false); // Page 1 choice
  const [genreChoice, setGenreChoice] = useState(null); // Page 2 choice
  return (
    <main className="base-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage 
            selected={selected}
            setSelected={setSelected}/>} />
            <Route path='/selection' element={<SelectionPage 
              selected={selected}
              genreChoice={genreChoice}
              setGenreChoice={setGenreChoice}/>} />
            <Route path='/results' element={<ResultsPage 
              genreChoice={genreChoice}
              setGenreChoice={setGenreChoice}/>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
