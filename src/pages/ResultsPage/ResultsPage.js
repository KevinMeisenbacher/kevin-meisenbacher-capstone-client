import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import './ResultsPage.scss';
import Song from './Song';
import { Link, useParams } from 'react-router-dom';

const ResultsPage = ({ url }) => {
    const [songs, setSongs] = useState([]);
    const [curatedSongs, setCuratedSongs] = useState([]);
    const [focusedSongs, setFocusedSongs] = useState([]);
    const [bangers, setBangers] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filterBtnText, setFilterBtnText] = useState('Show only like music');
    const { id1, id2 } = useParams();

    const filterSongs = () => { // Filter based on interests
        const similar = [];
        curatedSongs.some(song => {
            bangers.some(banger => { // Show everything the user likes
                if (song.genre_id === banger.genre_id ||
                    song.genre_id === banger.inspiration_id) {
                    if (curatedSongs.includes(song)) similar.push(song);
                }
            });
            if (!similar.includes(song) && ( // Show all within selected genres
                song.inspiration_id == id1 || song.inspiration_id == id2 ||
                song.origin_id == id1 || song.origin_id == id2
            )) {
                similar.push(song);
            }
        })
        if (!filtered) setFocusedSongs(similar);
        else setFocusedSongs(curatedSongs);
    }
    
    const handleFilter = () => { // Toggle the filtering logic
        setFiltered(!filtered);
        setFilterBtnText(filtered ? 'Show only like music' : 'Show all music');
        filterSongs();
    }

    const setArray = (location, action) => { // Axios automation
        axios.get(location)
            .then(response => {action(response.data)})
            .catch(err => console.error(err));
    }

    useEffect(() => { // Initialize all the things!
        Promise.all([
            setArray(`${url}/songs`, setSongs),
            setArray(`${url}/songs/${id1}/${id2}`, setCuratedSongs),
            setArray(`${url}/bangers/${sessionStorage.getItem('username')}`, setBangers)
        ])
        .catch(err => console.error('Error fetching data', err))
        .finally(setLoading(false));
    }, [loading, !songs]);

    
    return loading ? <h1>loading</h1> 
    : <div className="results-page">
        <div className='results-side'>
            <article className='results-box'>
            {focusedSongs.length > 0
            ? focusedSongs.map(song => {
                    return <Song 
                        key={song.id}
                        song={song} 
                        url={url} 
                        filtered={filtered} 
                        id1={id1} 
                        id2={id2}
                    />
                })
            : curatedSongs.map(song => {
                return <Song 
                        key={song.id}
                        song={song} 
                        url={url} 
                        filtered={filtered} 
                        id1={id1} 
                        id2={id2}
                    />
            })}
            </article>
            <button className="butt-filter" 
                onClick={() => handleFilter()}>
            {filterBtnText}</button>
        </div>
        <article className='options-box'>
            <Link to='/selection'><h1>Refine Results</h1></Link>
            <Link to='/'><h1>Start Over</h1></Link>
        </article>
    </div>
}

export default ResultsPage;