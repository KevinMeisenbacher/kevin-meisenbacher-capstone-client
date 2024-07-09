import axios from 'axios';
import { useState, useEffect } from 'react';
import './ResultsPage.scss';
import Song from '../../components/Song/Song';
import { Link } from 'react-router-dom';

const ResultsPage = ({ url, genreChoice, secondChoice }) => {
    const [songs, setSongs] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [filterBtnText, setFilterBtnText] = useState('Show only like music');

    const handleFilter = () => {
        setFiltered(!filtered);
        console.log('filtered', filtered);
        setFilterBtnText(filtered ? 'Show only like music' : 'Show all music');
    }

    useEffect(() => {
        axios.get(`${url}/songs/${genreChoice.id}/${secondChoice && secondChoice.id}`)
            .then(response => {setSongs(response.data)})
            .catch(err => console.error(err));
    }, [!filtered]);
    return <div className="results-page">
        <div className='results-side'>
            <article className='results-box'>
                {songs.map(song => {
                    return <Song song={song} url={url} filtered={filtered} />
                })}
            </article>
            <button onClick={() => handleFilter()}>{filterBtnText}</button>
        </div>
        <article className='options-box'>
            <Link to='/selection'><h1>Refine Results</h1></Link>
            <Link to='/'><h1>Start Over</h1></Link>
        </article>
    </div>
}

export default ResultsPage;