import { useState, useEffect } from "react";
import axios from 'axios';
import './Song.scss';

const Song = ({ song, url, filtered }) => {
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
    
    useEffect(() => {
        setItem(`${url}/artists/${song.artist_id}`, setArtist);
        setItem(`${url}/genres/${song.genre_id}`, setGenre);
        setItem(`${url}/subgenres/${artist.subgenre_id}`, setSubgenre);
        if (subgenre) {
            if (subgenre.origin_id === song.genre_id
            || subgenre.inspiration_id === song.genre_id) setRelated(true);
            else setRelated(false);
        }
        setShow(filtered // If filtered, show related music if it's in a subgenre
            ? subgenre && related
            : genre
        );
    }, [!subgenre, filtered]);
    if (show)
        return (<div className="song">
            <p>{song.song_name}</p>
            <p>{artist.artist_name}</p>
            <p>{subgenre ? subgenre.subgenre_name : genre.genre_name}</p>
        </div>)
}

export default Song;