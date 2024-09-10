import axios from 'axios';
import { useState, useEffect } from 'react';
import './ResultsPage.scss';
import Song from '../../components/Song/Song';
import { Link, useParams } from 'react-router-dom';

const ResultsPage = ({ url, genreChoice, secondChoice }) => {
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [bangers, setBangers] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [filterBtnText, setFilterBtnText] = useState('Show only like music');
    const { id1, id2 } = useParams();
    
    const handleFilter = () => {
        setFiltered(!filtered);
        setFilterBtnText(filtered ? 'Show only like music' : 'Show all music');
    }

    // Query backend for whatever the link is
    const setArray = (location, action) => {
        axios.get(location)
            .then(response => action(response.data))
            .catch(err => console.error(err));
    }

    const setItem = (location, action) => {
        axios.get(location)
            .then(response => action(response.data[0]))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        setArray(`${url}/songs`, setSongs);
        setArray(`${url}/songs/${genreChoice && id1}/${secondChoice && id2}`, setFilteredSongs);
        setArray(`${url}/bangers/${sessionStorage.getItem('username')}`, setBangers);
        bangers.forEach(banger => {
            songs.map(song => {
                if (song.genre_id === banger.genre_id ||
                    song.genre_id === banger.inspiration_id
                ) {
                    console.log(song);
                    setFilteredSongs([...filteredSongs, song]);
                }
            })
        });
        console.log('filteredSongs', filteredSongs);
    }, [!filtered, songs.length === 0, !filteredSongs]);
    return <div className="results-page">
        <div className='results-side'>
            <article className='results-box'>
                {filteredSongs.map(song => {
                    return <Song 
                        song={song} 
                        url={url} 
                        filtered={filtered} 
                        genreChoice={genreChoice} 
                        secondChoice={secondChoice}
                        setItem={setItem}
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