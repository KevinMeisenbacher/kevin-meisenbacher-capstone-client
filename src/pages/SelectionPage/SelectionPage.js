import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ContentSection from './ContentSection';
import './SelectionPage.scss';

const SelectionPage = ({ url, selected }) => {
    const [genres, setGenres] = useState([]);
    const [id1, setId1] = useState(0); // Page 2 choice
    const [id2, setId2] = useState(0); // Page 2 alt choice

    useEffect(() => {
        axios.get(`${url}/genres`)
        .then(response => setGenres(response.data))
        .catch(err => console.error(err));
    }, [])
    
    return <main>
        <div className='content'>
            {selected === 'a' && <ContentSection 
                genres={genres}
                setGenreChoice={setId1}
                header='What genres are you trying to get into?'
                choiceList='curiosity' 
            />}
            <ContentSection 
                genres={genres}
                genreChoice={id2}
                setGenreChoice={setId2}
                header='What music do you currently listen to?'
                choiceList='preference'
            />
        </div>
        <div className='navimagation-buttons'>
            <Link to='/'>
                <button className='butt-nav'>back</button>
            </Link>
            <Link to={`/results${id1 > 0 ? `/${id1}` : ''}${id2 > 0 ? `/${id2}` : ''}`}>
                <button className='butt-nav'>next</button>
            </Link>
        </div>
    </main>
}

export default SelectionPage;