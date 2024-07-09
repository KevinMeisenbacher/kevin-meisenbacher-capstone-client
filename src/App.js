import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.scss';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import SelectionPage from './pages/SelectionPage/SelectionPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';

function App() {
  const url = 'http://localhost:8080';
  const [selected, setSelected] = useState(false); // Page 1 choice
  const [genreChoice, setGenreChoice] = useState(null); // Page 2 choice
  const [secondChoice, setSecondChoice] = useState(null); // Page 2 alt choice

  // Query backend for whatever the link is
  const setItem = (location, action) => {
      axios.get(location)
          .then(response => action(response.data[0]));
  }

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
            <Route path='/results' element={<ResultsPage 
              url={url}
              selected={selected}
              setItem={setItem}
              genreChoice={genreChoice}
              secondChoice={secondChoice}/>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
