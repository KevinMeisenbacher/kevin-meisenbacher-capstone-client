import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import SelectionPage from './pages/SelectionPage/SelectionPage';

function App() {
  return (
    <main className="base-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/selection' element={<SelectionPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
