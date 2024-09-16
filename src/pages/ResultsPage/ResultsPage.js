import axios from 'axios';
import { useState, useEffect } from 'react';
import './ResultsPage.scss';
import Song from '../../components/Song/Song';
import { Link, useParams } from 'react-router-dom';

const ResultsPage = ({ url, genreChoice, secondChoice }) => {
    const [songs, setSongs] = useState([]);
    const [curatedSongs, setCuratedSongs] = useState([]);
    const [famGenreSongs, setFamGenreSongs] = useState([]);
    const [bangers, setBangers] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filterBtnText, setFilterBtnText] = useState('Show only like music');
    const { id1, id2 } = useParams();
    
    const handleFilter = () => {
        setFiltered(!filtered);
        setFilterBtnText(filtered ? 'Show only like music' : 'Show all music');
    }

    const setArray = (location, action) => {
        axios.get(location)
            .then(response => {action(response.data)
                console.log(location, response.data)
            })
            .catch(err => console.error(err));
    }

    const filterSongs = () => {
        const similar = [];
        bangers.forEach(banger => {
            // curatedSongs.map(song => similar.push(song));
            songs.map(song => {
                if (song.genre_id === banger.genre_id ||
                    song.genre_id === banger.inspiration_id
                ) {
                    similar.push(song);
                }
            })
        });
        setFamGenreSongs(similar);
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
        setLoading(false);
    }, [songs.length === 0, famGenreSongs.length === 0]);
    if (!loading) return <div className="results-page">
        <div className='results-side'>
            <article className='results-box'>
                {famGenreSongs.length > 0
                ? famGenreSongs.map(song => {
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
            <button className="butt-filter" onClick={() => handleFilter()}>{filterBtnText}</button>
        </div>
        <article className='options-box'>
            <Link to='/selection'><h1>Refine Results</h1></Link>
            <Link to='/'><h1>Start Over</h1></Link>
        </article>
    </div>
}

export default ResultsPage;