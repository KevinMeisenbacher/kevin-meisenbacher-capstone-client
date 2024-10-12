import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import './ResultsPage.scss';
import Song from '../../components/Song/Song';
import { Link, useParams } from 'react-router-dom';

const ResultsPage = ({ url }) => {
    const [songs, setSongs] = useState([]);
    const [curatedSongs, setCuratedSongs] = useState([]);
    const [famGenreSongs, setFamGenreSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [bangers, setBangers] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const [filterBtnText, setFilterBtnText] = useState('Show only like music');
    const { id1, id2 } = useParams();

    const setArray = (location, action) => {
        axios.get(location)
            .then(response => {action(response.data)})
            .catch(err => console.error(err));
    }

    const filterSongs = () => {
        const similar = [];
        songs.filter(song => {
            bangers.filter(banger => {
                if (song.genre_id === banger.genre_id ||
                    song.genre_id === banger.inspiration_id) {
                    similar.push(song);
                }
            });
            if (!similar.includes(song) && (
                song.inspiration_id == id1 || song.inspiration_id == id2 ||
                song.origin_id == id1 || song.origin_id == id2
            )) {
                similar.push(song);
            }
        })
        setFamGenreSongs(similar);
        const famGenreFilter = [];
        curatedSongs.filter(song => {
            if (!famGenreFilter.includes(song)) famGenreFilter.push(song);
        });
        famGenreSongs.filter(song => {
            if (!famGenreFilter.includes(song)) famGenreFilter.push(song);
        });
        if (!filtered) setFilteredSongs(similar);
        else setFilteredSongs({});
        console.log(filteredSongs);
    }
    
    const handleFilter = () => {
        setFiltered(!filtered);
        setFilterBtnText(filtered ? 'Show only like music' : 'Show all music');
        filterSongs();
    }

    useEffect(() => {
        Promise.all([
            setArray(`${url}/songs`, setSongs),
            setArray(`${url}/songs/${id1}/${id2}`, setCuratedSongs),
            setArray(`${url}/bangers/${sessionStorage.getItem('username')}`, setBangers)
        ])
        .catch(err => console.error('Error fetching data', err))
        .finally(setLoading(false));
    }, [loading, !filteredSongs]);

    
    return loading ? <h1>loading</h1> 
    : <div className="results-page">
        <div className='results-side'>
            <article className='results-box'>
            {filteredSongs.length > 0
                ? filteredSongs.map(song => {
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
                onClick={() => handleFilter()}
            >
                {filterBtnText}
            </button>
        </div>
        <article className='options-box'>
            <Link to='/selection'><h1>Refine Results</h1></Link>
            <Link to='/'><h1>Start Over</h1></Link>
        </article>
    </div>
}

export default ResultsPage;