import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import './Song.scss';

// Images
import like from '../../assets/img/banger.png';
import hate from '../../assets/img/poop.png';

const Song = ({ song, url, filtered, setCurrentSong }) => {
    const [user, setUser] = useState({});
    const [artist, setArtist] = useState({});
    const [genre, setGenre] = useState({});
    const [subgenre, setSubgenre] = useState({});
    const [banger, setBanger] = useState({});
    const [crap, setCrap] = useState({});
    const [liked, setLiked] = useState('');
    const [hated, setHated] = useState('');
    const [show, setShow] = useState({});
    const [related, setRelated] = useState(false);

    // Set a specific object respective to the current song
    const setItem = (location, action) => {
        axios.get(location)
            .then(response => {{
                action(response.data[0] || response.data);
            }})
            .catch(err => console.error(err));
    }

    // Get the logged in user by matching sessionStorage with the users table
    useEffect(() => {
        axios.get(`${url}/users`)
        .then(response => {
            setUser(response.data.find(user => user?.username === sessionStorage?.username));
        })
        .catch(err => console.error(err));
    }, [url])
    
    // Fetch the API to get all necessary data for the song
    useEffect(() => {
        setItem(`${url}/artists/${song.artist_id}`, setArtist);
        setItem(`${url}/genres/${song.genre_id}`, setGenre);
    }, [song, url]);

    useEffect(() => {
        setItem(`${url}/subgenres/${artist.subgenre_id || 0}`, setSubgenre);
    }, [artist, filtered, url])

    useEffect(() => {
        if (subgenre.origin_id === song.genre_id
        || subgenre.inspiration_id === song.genre_id) 
            setRelated(true);
        else setRelated(false);

        setShow(filtered // If filtered, show related music if it's in a subgenre
            ? subgenre && related
            : genre
        );
    }, [subgenre])

//#region interest filters
    // Handle like/unlike or hate/unhate depending on which button is clicked
    const handleAction = useCallback((choice, location, state, method) => {
        const action = state?.artist_id === song.artist_id
            ? `un${choice}` : choice;
            
        axios.post(`${url}/${action}/${song.artist_id}/${user?.id}`)
            .then(() => markSong(location, method))
            .then(markSong('bangers', song || {}))
            .catch(err => console.error(err));
    }, [song, banger, setBanger, crap, setCrap, user]);

    // Get songs that are liked/hated by the user
    const markSong = (location, action) => {
        axios.get(`${url}/${location}/${user?.id}`)
        .then(response => {
            for (let i=0; i<response.data.length; i++){
                if (response.data[i].artist_id === song.artist_id){ 
                    action(song);
                    setLiked(song === banger ? 'liked' : '');
                    setHated(song === crap ? 'hated' : '');
                }
            }
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        markSong('bangers', setBanger);
        markSong('crap', setCrap);
    }, [handleAction])
//#endregion
    if (show && song !== crap)
        return (<div className={`song ${user ? 'loggedIn' : 'loggedOut'}`}>
            <div className="song-contents" onClick={() => setCurrentSong(song.song_name)}>
                <span className="song-filterer"></span>
                <span className="song-info">
                    <p>{song?.song_name}</p>
                    <p>{artist?.artist_name}</p>
                    <p>{subgenre?.subgenre_name ?? genre?.genre_name}</p>
                </span>
                {sessionStorage.getItem('username') && <span className={`song-filterer`}>
                     <img 
                        className={liked} 
                        src={like} 
                        onClick={() => handleAction('like', 'bangers', banger, setBanger)} 
                        alt="like" 
                    /><img 
                        className={hated} 
                        src={hate} 
                        onClick={() => handleAction('hate', 'crap', crap, setCrap)} 
                        alt="hate" 
                    />
                </span>}
            </div>
        </div>)
}

export default Song;