import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ContentSection from '../../components/ContentSection/ContentSection';
import './SelectionPage.scss';

const SelectionPage = ({ 
    url, selected, genreChoice, setGenreChoice, secondChoice, setSecondChoice 
}) => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${url}/genres`)
        .then(response => setGenres(response.data))
        .then(setLoading(false));
    }, [])
    
    if (!loading) return <main>
        <div className='content'>
            {selected === 'a' && <ContentSection 
                genres={genres}
                header='What genres are you trying to get into?'
                choiceList='curiosity'
                genreChoice={secondChoice}
                setGenreChoice={setSecondChoice} />}
            <ContentSection 
                genres={genres}
                header='What music do you like?'
                choiceList='preference'
                genreChoice={genreChoice}
                setGenreChoice={setGenreChoice} />
        </div>
        <Link to='/results'>
            <button className='butt-next'>next</button>
        </Link>
    </main>
}

export default SelectionPage;