import axios from 'axios';
import { useState, useEffect } from 'react';
import './ResultsPage.scss';
import Song from '../../components/Song/Song';
import { Link } from 'react-router-dom';

const ResultsPage = ({ url, genreChoice, secondChoice }) => {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        axios.get(`${url}/songs/${genreChoice.id}/${secondChoice && secondChoice.id}`)
            .then(response => setSongs(response.data))
    }, []);
    return <div className="results-page">
        <article className='results-box'>
            {songs.map(song => {
                return <Song song={song} url={url} />
            })}
        </article>
        <article className='options-box'>
            <Link to='/selection'><h1>Refine Results</h1></Link>
            <Link to='/'><h1>Start Over</h1></Link>
        </article>
    </div>
}

export default ResultsPage;