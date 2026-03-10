import axios from 'axios';
import { useState, useEffect } from 'react';
import './ResultsPage.scss';
import Song from '../../components/Song/Song';
import { Link, useParams } from 'react-router-dom';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';

const ResultsPage = ({ url, loading, setLoading }) => {
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [subgenres, setSubgenres] = useState([]);
    const [curatedSongs, setCuratedSongs] = useState([]);
    const [bangers, setBangers] = useState([]);
    const [crap, setCrap] = useState([]);
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

    const initData = () => {

        Promise.all([
            setArray(`${url}/songs`, setSongs),
            setArray(`${url}/artists`, setArtists),
            setArray(`${url}/genres`, setGenres),
            setArray(`${url}/subgenres`, setSubgenres),
            setArray(`${url}/bangers/${sessionStorage.getItem('username')}`, setBangers),
            setArray(`${url}/crap/${sessionStorage.getItem('username')}`, setCrap)
        ])
        .then(Promise.all([
            sessionStorage.setItem('songs', JSON.stringify(songs)),
            sessionStorage.setItem('artists', JSON.stringify(artists)),
            sessionStorage.setItem('genres', JSON.stringify(genres)),
            sessionStorage.setItem('subgenres', JSON.stringify(subgenres)),
            sessionStorage.setItem('bangers', JSON.stringify(bangers)),
            sessionStorage.setItem('crap', JSON.stringify(crap)),
        ]))
        .catch(err => console.error('Error fetching data', err))
    }

    useEffect(() => { // Initialize all the things!
        if (sessionStorage.getItem('songs') === null) initData();
        else {
            setSongs(JSON.parse(sessionStorage.getItem('songs')));
            setArtists(JSON.parse(sessionStorage.getItem('artists')));
            setGenres(JSON.parse(sessionStorage.getItem('genres')));
            setSubgenres(JSON.parse(sessionStorage.getItem('subgenres')));
            setBangers(JSON.parse(sessionStorage.getItem('bangers')));
            setCrap(JSON.parse(sessionStorage.getItem('crap')));
            setLoading(false);
        }
        setArray(`${url}/songs/${id1}/${id2 || ''}`, setCuratedSongs)
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
                            artists={artists}
                            genres={genres}
                            subgenres={subgenres}
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