import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import SelectionPage from './pages/SelectionPage/SelectionPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';

function App() {
  const url = 'http://localhost:8080';
  const [selected, setSelected] = useState(false); // Page 1 choice
  const [genreChoice, setGenreChoice] = useState(0); // Page 2 choice
  const [secondChoice, setSecondChoice] = useState(0); // Page 2 alt choice

  const element = <ResultsPage 
    url={url}
    selected={selected}
    genreChoice={genreChoice}
    secondChoice={secondChoice}
  />

  return (
    <main className="base-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage 
            selected={selected}
            setSelected={setSelected}/>} />
            <Route path='/selection' element={<SelectionPage 
              url={url}
              selected={selected}
              genreChoice={genreChoice}
              setGenreChoice={setGenreChoice}
              secondChoice={secondChoice}
              setSecondChoice={setSecondChoice}/>} />
            <Route path='/results/:id1' element={element} />
            <Route path='/results/:id1/:id2' element={element} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
