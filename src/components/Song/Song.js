import { useState, useEffect } from "react";
import axios from 'axios';
import './Song.scss'

const Song = ({ song, url }) => {
    const [artist, setArtist] = useState({});
    const [genre, setGenre] = useState('');
    
    useEffect(() => {
        axios.get(`${url}/artists/${song.artist_id}`)
            .then(response => setArtist(response.data[0]))
        axios.get(`${url}/genres/${song.genre_id}`)
            .then(response => setGenre(response.data[0]))
    }, []);
    return (<div className="song">
        <p>{song.song_name}</p>
        <p>{artist.artist_name}</p>
        <p>{genre.genre_name}</p>
    </div>)
}

export default Song;