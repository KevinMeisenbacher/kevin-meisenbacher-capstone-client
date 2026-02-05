import { useState, useEffect } from "react";
import axios from 'axios';
import './Song.scss';

const Song = ({ song, url, filtered }) => {
    const [artist, setArtist] = useState(null);
    const [genre, setGenre] = useState(null);
    const [subgenre, setSubgenre] = useState(null);

    useEffect(() => {
        if (!song?.artist_id || !song?.genre_id) return;

        const fetchData = async() => {
            try {
                const [artistRes, genreRes] = await Promise.all ([
                    axios.get(`${url}/artists/${song.artist_id}`),
                    axios.get(`${url}/genres/${song.genre_id}`)
                ]);
                setArtist(artistRes.data);

                const genreData = Array.isArray(genreRes.data) 
                    ? genreRes.data[0] : genreRes.data;
                setGenre(genreData);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [song?.artist_id, song?.genre_id, url]);
    
    useEffect(() => {
        if (!song?.subgenre_id) return;

        axios.get(`${url}/subgenres/${song.subgenre_id}`)
        .then(res => {
            setSubgenre(Array.isArray(res.data) ? res.data[0] : res.data);
            console.log(res.data);
        })
        .catch(err => {
            if (err.name !== 'CanceledError') console.error(err);
        });
    }, [song?.subgenre_id, url])
    
    const related = subgenre?.origin_id === song.genre_id
        || subgenre?.inspiration_id === song.genre_id;

    const show = filtered ? related : genre;
    if (!artist || !genre) return null;
    if (!show) return null;
    
    // useEffect(() => {
    //     if (!song) return;
    //     setItem(`${url}/artists/${song.artist_id}`, setArtist);
    //     console.log(song);
    //     setItem(`${url}/genres/${song.genre_id}`, setGenre);
    // }, [song, url]);

    // useEffect(() => {
    //     if (!artist?.subgenre_id) return;
    //     setItem(`${url}/subgenres/${artist.subgenre_id}`, setSubgenre);
    // }, [artist, url])

    // useEffect(() => {
    //     if (!subgenre) return;

    //     const isRelated = subgenre.origin_id === song.genre_id
    //     || subgenre.inspiration_id === song.genre_id;

    //     setRelated(isRelated);

    //     setShow(filtered // If filtered, show related music if it's in a subgenre
    //         ? isRelated
    //         : genre
    //     );
    // }, [subgenre, genre, filtered, song])
    return (<div className="song">
        <p>{song.song_name}</p>
        <p>{artist?.artist_name}</p>
        <p>{subgenre?.subgenre_name ?? genre.genre_name}</p>
    </div>)
}

export default Song;