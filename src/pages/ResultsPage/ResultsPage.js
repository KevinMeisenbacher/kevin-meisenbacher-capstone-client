import axios from 'axios';
import { useState, useEffect } from 'react';
import './ResultsPage.scss';
import Song from '../../components/Song/Song';
import { Link, useParams } from 'react-router-dom';

const ResultsPage = ({ url, genreChoice, secondChoice }) => {
    const [songs, setSongs] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [filterBtnText, setFilterBtnText] = useState('Show only like music');
    const { id1, id2 } = useParams();
    
    const handleFilter = () => {
        setFiltered(!filtered);
        setFilterBtnText(filtered ? 'Show only like music' : 'Show all music');
    }

    useEffect(() => {
        axios.get(`${url}/songs/${genreChoice && id1}/${secondChoice && id2}`)
            .then(response => {setSongs(response.data)})
            .catch(err => console.error(err));
    }, [!filtered, songs.length === 0]);
    return <div className="results-page">
        <div className='results-side'>
            <article className='results-box'>
                {songs.map(song => {
                    return <Song 
                        song={song} 
                        url={url} 
                        filtered={filtered} 
                        genreChoice={genreChoice} 
                        secondChoice={secondChoice}
                    />
                })}
            </article>
            <button className="butt-filter" onClick={() => handleFilter()}>{filterBtnText}</button>
        </div>
        <article className='options-box'>
            <Link to='/selection'><h1>Refine Results</h1></Link>
            <Link to='/'><h1>Start Over</h1></Link>
        </article>
    </div>
}

export default ResultsPage;