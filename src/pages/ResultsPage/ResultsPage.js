import axios from 'axios';
import { useState, useEffect } from 'react';
import './ResultsPage.scss';
import Song from '../../components/Song/Song';
import { Link } from 'react-router-dom';

const ResultsPage = ({ genreChoice }) => {
    const [songs, setSongs] = useState([]);
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    useEffect(() => {
       axios.get(`http://localhost:8080/songs/${genreChoice.id}`)
       .then(response => {
        setSongs(response.data);
       })
    }, []);
    return <div className="results-page">
        <article className='results-box'>
            {songs.map(song => {
                return <Song song={song} />
            })}
        </article>
        <article className='options-box'>
            <Link to='/selection'><h1>Refine Results</h1></Link>
            <Link to='/'><h1>Start Over</h1></Link>
        </article>
    </div>
}

export default ResultsPage;