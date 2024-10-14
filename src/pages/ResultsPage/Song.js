import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import './Song.scss';
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import SignIn from "../../components/Header/SignIn";

// Images
import like from '../../assets/img/banger.png';
import hate from '../../assets/img/poop.png';

const Song = ({ song, url }) => {
    const [artist, setArtist] = useState({});
    const [genre, setGenre] = useState({});
    const [subgenre, setSubgenre] = useState({});
    const [banger, setBanger] = useState({});
    const [crap, setCrap] = useState({});
    const [liked, setLiked] = useState('');
    const [hated, setHated] = useState('');

    const { handleLogin } = SignIn;

    // Set a specific object respective to the current song
    const setItem = (location, action) => {
        axios.get(location)
            .then(response => action(response.data[0]))
            .catch(err => console.error(err));
    }

    // Get songs that are liked/hated by the user
    const markSong = (location, action) => {
        axios.get(`${url}/${location}/${sessionStorage.getItem('username')}`)
        .then(response => {
            const { data } = response;

            for (let i=0; i<data.length; i++){
                if (data[i].artist_id === song.artist_id){ 
                    action(song);
                }
            }

            setLiked(song === banger ? 'liked' : '');
            setHated(song === crap ? 'hated' : '');
        })
        .catch(err => console.error(err));
    }

    // Handle like/unlike or hate/unhate depending on which button is clicked
    const handleAction = useCallback((choice, location, state, method) => {
        const action = song === state
            ? `un${choice}` : choice;
            
        axios.post(`http://localhost:8080/${action}/${song.artist_id}/${sessionStorage.getItem('username')}`)
            .then(markSong(location, method))
            .catch(err => console.error(err));
    }, [song, banger, setBanger, crap, setCrap]);
    
    // Fetch the API to get all necessary data for the song
    useEffect(() => {
        Promise.all([
            setItem(`${url}/artists/${song.artist_id}`, setArtist),
            setItem(`${url}/genres/${song.genre_id}`, setGenre),
            setItem(`${url}/subgenres/${artist.subgenre_id}`, setSubgenre)
        ]);
        markSong('bangers', setBanger);
        markSong('crap', setCrap);
    }, [handleAction]);
    
    if (song !== crap)
        return (<div className="song">
            <div className="song-contents">
                <span className="song-filterer"></span>
                <span className="song-info">
                    <p>{song?.song_name}</p>
                    <p>{artist?.artist_name}</p>
                    <p>{subgenre?.subgenre_name || genre?.genre_name}</p>
                </span>
                <span className="song-filterer">
                    {sessionStorage.getItem('username') 
                    && <img 
                        className={liked} 
                        src={like} 
                        onClick={() => handleAction('like', 'bangers', banger, setBanger)} 
                        alt="like" 
                    />}
                    {sessionStorage.getItem('username') 
                    && <img 
                        className={hated} 
                        src={hate} 
                        onClick={() => handleAction('hate', 'crap', crap, setCrap)} 
                        alt="hate" 
                    />}
                </span>
            </div>
            <MusicPlayer song={song.song_name} />
        </div>)
}

export default Song;