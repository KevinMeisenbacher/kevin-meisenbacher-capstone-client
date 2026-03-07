import axios from 'axios';
import { useState, useEffect } from 'react';
import './ResultsPage.scss';
import Song from '../../components/Song/Song';
import { Link, useParams } from 'react-router-dom';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';

const ResultsPage = ({ url, loading, setLoading }) => {
    const [_, setSongs] = useState([]);
    const [curatedSongs, setCuratedSongs] = useState([]);
    const [banger, setBanger] = useState({});
    const [bangers, setBangers] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const { id1, id2 } = useParams();

    // Filtering logic
    const focusedSongs = filtered
    ? curatedSongs.filter(song =>
        bangers.some(banger => 
            song.genre_id === banger.genre_id ||
            song.genre_id === banger.inspiration_id
        ) ||
        song.inspiration_id === Number(id1) || 
        song.inspiration_id === Number(id2) ||
        song.origin_id === Number(id1) || 
        song.origin_id === Number(id2)
    )
    : curatedSongs;
    
    // Filter between all music and similar music between categories
    const handleFilter = () => { setFiltered(!filtered) }
    const filterBtnText = filtered ? 'Show only like music' : 'Show all music';

    const setArray = (location, action) => { // Axios automation
        return axios.get(location)
            .then(response => {action(response.data)})
            .catch(err => console.error(err));
    }

    useEffect(() => { // Initialize all the things!
        Promise.all([
            setArray(`${url}/songs`, setSongs),
            setArray(`${url}/songs/${id1}/${id2 || ''}`, setCuratedSongs),
            setArray(`${url}/bangers/${sessionStorage.getItem('username')}`, setBangers)
        ])
        .catch(err => console.error('Error fetching data', err))
        .finally(() => {
            setLoading(false);
            if (sessionStorage.getItem('loading') === true) sessionStorage.setItem('loading', false);
        });
    }, [loading]);
    
    return loading ? <h1>loading</h1> 
    : <div className="results-page">
        <div className='results-side'>
            <article className='results-box'>
                <article className='results-list'>
                    {focusedSongs.map(song => {
                        return <Song 
                            key={song.id}
                            song={song} 
                            setCurrentSong={setCurrentSong}
                            banger={banger}
                            setBanger={setBanger}
                            setLoading={setLoading}
                            url={url} 
                            filtered={filtered} 
                            id1={id1} 
                            id2={id2}
                        />
                    })}
                </article>
                <MusicPlayer 
                    song={currentSong} 
                    className="sticky" 
                />
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