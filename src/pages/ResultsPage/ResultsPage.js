import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import './ResultsPage.scss';
import Song from '../../components/Song/Song';
import { Link, useParams } from 'react-router-dom';

const ResultsPage = ({ url, genreChoice, secondChoice }) => {
    const [songs, setSongs] = useState([]);
    const [curatedSongs, setCuratedSongs] = useState([]);
    const [famGenreSongs, setFamGenreSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [bangers, setBangers] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filterBtnText, setFilterBtnText] = useState('Show only like music');
    const { id1, id2 } = useParams();
    
    const handleFilter = () => {
        setFiltered(!filtered);
        setFilterBtnText(filtered ? 'Show only like music' : 'Show all music');
        filterSongs(setFamGenreSongs);
    }

    const setArray = (location, action) => {
        axios.get(location)
            .then(response => {action(response.data)})
            .catch(err => console.error(err));
    }

    const filterSongs = useCallback(() => {
        const similar = [];
        bangers.forEach(banger => {
            songs.forEach(song => {
                if (song.genre_id === banger.genre_id ||
                    song.genre_id === banger.inspiration_id) {
                    similar.push(song);
                }
            })
        });
        if (JSON.stringify(similar) !== JSON.stringify(filteredSongs))
            setFilteredSongs(similar);
    }, [bangers, songs, filteredSongs]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            setArray(`${url}/songs`, setSongs),
            setArray(`${url}/songs/${genreChoice > 0 && id1}/${secondChoice > 0 && id2}`, setCuratedSongs),
            setArray(`${url}/bangers/${sessionStorage.getItem('username')}`, setBangers)
        ])
        .catch(err => console.error('Error fetching data', err))
        .finally(setLoading(false));
    }, [!songs])

    useEffect(() => {
        if (songs.length > 0 && bangers.length > 0) 
            filterSongs();
    }, [filterSongs]);

    // Filtering renderer downstairs will return this exact thing
    // with different respective values
    const renderSongs = (songs) => {
        return songs.map(song => (
            <Song 
                key={song.id}
                song={song} 
                url={url} 
                filtered={filtered} 
                genreChoice={genreChoice} 
                secondChoice={secondChoice}
            />
        ))
    }
    
    return loading 
    ? <h1>Loading...</h1> 
    : <div className="results-page">
        <div className='results-side'>
            <article className='results-box'>
                {filteredSongs.length > 0
                ? renderSongs(filteredSongs)
                : renderSongs(curatedSongs || [])}
            </article>
            <button className="butt-filter" 
                onClick={() => handleFilter()}
                onLoad={() => handleFilter()}
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