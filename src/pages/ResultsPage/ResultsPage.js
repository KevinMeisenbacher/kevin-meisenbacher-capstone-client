import axios from 'axios';
import { useState, useEffect } from 'react';
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
    const [ready, setReady] = useState(false);
    const [filterBtnText, setFilterBtnText] = useState('Show only like music');
    const { id1, id2 } = useParams();
    
    const handleFilter = () => {
        setReady(false);
        setFiltered(!filtered);
        setFilterBtnText(filtered ? 'Show only like music' : 'Show all music');
        filterSongs(setFamGenreSongs);
        setReady(true);
    }

    const setArray = (location, action) => {
        axios.get(location)
            .then(response => {action(response.data)})
            .catch(err => console.error(err));
    }

    const filterSongs = () => {
        const similar = [];
        bangers.forEach(banger => {
            // curatedSongs.map(song => similar.push(song));
            songs.filter(song => {
                console.log('banger', banger);
                console.log('song', song);
                if (song.genre_id === banger.genre_id ||
                    song.genre_id === banger.inspiration_id) {
                    // if (banger.artist_id === song.artist_id) console.log(song);
                    similar.push(song);
                }
            })
        });
        setFamGenreSongs(similar);
        const famGenreFilter = [];
        curatedSongs.filter(song => {
            if (!famGenreFilter.includes(song)) famGenreFilter.push(song);
        });
        famGenreSongs.filter(song => {
            if (!famGenreFilter.includes(song)) famGenreFilter.push(song);
        });
        setFilteredSongs(famGenreFilter);
    }

    useEffect(() => {
        setArray(`${url}/songs`, setSongs);
        setArray(`${url}/songs/${genreChoice && id1}/${secondChoice && id2}`, setCuratedSongs);
        setArray(`${url}/bangers/${sessionStorage.getItem('username')}`, setBangers);
        if (songs.length > 0)
            filterSongs();
        if (famGenreSongs.length > 0) 
            console.log('famGenreSongs', famGenreSongs);
        else
            filterSongs();
        handleFilter();
        setLoading(false);
    }, [loading, !ready]);
    
    return <div className="results-page">
        <div className='results-side'>
            <article className='results-box'>
            {filteredSongs.length > 0
                ? filteredSongs.map(song => {
                    return <Song 
                        song={song} 
                        url={url} 
                        filtered={filtered} 
                        genreChoice={genreChoice} 
                        secondChoice={secondChoice}
                    />
                })
            : curatedSongs.map(song => {
                return <Song 
                    song={song} 
                    url={url} 
                    filtered={filtered} 
                    genreChoice={genreChoice} 
                    secondChoice={secondChoice}
                />
            })}
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