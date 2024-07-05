import { useState, useEffect } from "react";
import axios from 'axios';

const Song = ({ song }) => {
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    
    useEffect(() => {
        axios.get(`http://localhost:8080/artists/${song.artist_id}`)
        .then(response => {
            setArtist(response.data);
            console.log(artist);
        })
    }, []);
    return (<div>
        <p>{song.song_name}</p>
        <p>{artist.artist_name}</p>
        <p>{genre.genre_name}</p>
    </div>)
}

export default Song;