import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ContentSection from '../../components/ContentSection/ContentSection';
import './SelectionPage.scss';

const SelectionPage = ({ selected, genreChoice, setGenreChoice }) => {
    const [genres, setGenres] = useState([]);
    // const genres = [];
    const [loading, setLoading] = useState(true);
    // This is what the headers on page 2 will say
    const newGenresHeader = 'What genres are you trying to get into?';
    const familiarGenresHeader = 'What music do you like?';

    useEffect(() => {
        axios.get('http://localhost:8080/genres')
        .then(response => {
            setGenres(response.data);
        })
        .then(setLoading(false));
    }, [])
    
    if (!loading) return <main>
        <div className='content'>
            {/* TODO: Make the second section only
            show up when the "looking for new genres"
            box is clicked, give it a different header,
            and give it a different link */}
            {selected === 'a' && <ContentSection 
                genres={genres}
                header={newGenresHeader}
                genreChoice={genreChoice}
                setGenreChoice={setGenreChoice} />}
            <ContentSection 
                genres={genres}
                header={familiarGenresHeader}
                genreChoice={genreChoice}
                setGenreChoice={setGenreChoice} />
        </div>
        <Link to='/results'>
            <button className='butt-next'>next</button>
        </Link>
    </main>
}

export default SelectionPage;