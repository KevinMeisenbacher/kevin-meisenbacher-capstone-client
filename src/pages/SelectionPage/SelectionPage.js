import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ContentSection from '../../components/ContentSection/ContentSection';
import './SelectionPage.scss';

const SelectionPage = ({ 
    url, selected, genreChoice, setGenreChoice, secondChoice, setSecondChoice 
}) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get(`${url}/genres`)
        .then(response => setGenres(response.data))
        .catch(err => console.error(err));
    }, [])
    
    return <main>
        <div className='content'>
            {selected === 'a' && <ContentSection 
                genres={genres}
                header='What genres are you trying to get into?'
                choiceList='curiosity'
                genreChoice={secondChoice}
                setGenreChoice={setSecondChoice} />}
            <ContentSection 
                genres={genres}
                header='What music do you currently listen to?'
                choiceList='preference'
                genreChoice={genreChoice}
                setGenreChoice={setGenreChoice} />
        </div>
        <div className='navimagation-buttons'>
            <Link to='/'>
                <button className='butt-nav'>back</button>
            </Link>
            <Link to='/results'>
                <button className='butt-nav'>next</button>
            </Link>
        </div>
    </main>
}

export default SelectionPage;