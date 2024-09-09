import { useState, useEffect } from "react";
import axios from 'axios';
import './Song.scss';
import MusicPlayer from "../MusicPlayer/MusicPlayer";

// Images
import like from '../../assets/img/banger.png';
import hate from '../../assets/img/poop.png';

const Song = ({ song, url, genreChoice, secondChoice, filtered }) => {
    const [artist, setArtist] = useState({});
    const [genre, setGenre] = useState({});
    const [subgenre, setSubgenre] = useState({});
    const [show, setShow] = useState(null);
    const [related, setRelated] = useState(false);

    // Query backend for whatever the link is
    const setItem = (location, action) => {
        axios.get(location)
            .then(response => action(response.data[0]))
            .catch(err => console.error(err));
    }
    
    // Fetch the API to get all necessary data for the song
    useEffect(() => {
        setItem(`${url}/artists/${song.artist_id}`, setArtist);
        setItem(`${url}/genres/${song.genre_id}`, setGenre);
        setItem(`${url}/subgenres/${artist.subgenre_id}`, setSubgenre);
        
        if (subgenre) {
            if (secondChoice) {
                if (subgenre.inspiration_id === secondChoice.id)
                    setRelated(true);
            }
            else if (!secondChoice) {
                if (subgenre.inspiration_id === genreChoice.id)
                    setRelated(true);
            }
        }
        else setRelated(false);
        setShow(filtered // If filtered, show related music if it's in a subgenre
            ? subgenre && related
            : genre
        );
    }, [!subgenre, filtered]);

    const handleLike = () => {
        axios.post(`http://localhost:8080/like/${song.artist_id}/${song.genre_id}/${sessionStorage.getItem('username')}`)
    }

    const handleHate = () => {
        axios.post(`http://localhost:8080/hate/${song.artist_id}/${song.genre_id}/${sessionStorage.getItem('username')}`)
    }
    
    if (show)
        return (<div className="song">
            <div className="song-contents">
                <span className="song-filterer"></span>
                <span className="song-info">
                    <p>{song.song_name}</p>
                    <p>{artist.artist_name}</p>
                    <p>{subgenre ? subgenre.subgenre_name : genre.genre_name}</p>
                </span>
                <span className="song-filterer">
                    <img src={like} onClick={() => handleLike()} alt="like" />
                    <img src={hate} onClick={() => handleHate()} alt="hate" />
                </span>
            </div>
            <MusicPlayer song={song.song_name} />
        </div>)
}

export default Song;