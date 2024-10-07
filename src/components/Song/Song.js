import { useState, useEffect } from "react";
import axios from 'axios';
import './Song.scss';
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { useLocation } from "react-router-dom";

// Images
import like from '../../assets/img/banger.png';
import hate from '../../assets/img/poop.png';

const Song = ({ song, url, genreChoice, secondChoice, filtered }) => {
    const [artist, setArtist] = useState({});
    const [genre, setGenre] = useState({});
    const [subgenre, setSubgenre] = useState({});
    const [show, setShow] = useState({});
    const [related, setRelated] = useState({});
    const [banger, setBanger] = useState({});
    const [crap, setCrap] = useState({});
    const [liked, setLiked] = useState('');
    const [hated, setHated] = useState('');

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

            if (song === banger) setLiked('liked');
            else setLiked('');
            if (song === crap) setHated('hated');
            else setHated('');
        })
        .catch(err => console.error(err));
    }
    
    // Fetch the API to get all necessary data for the song
    useEffect(() => {
        setItem(`${url}/artists/${song.artist_id}`, setArtist);
        setItem(`${url}/genres/${song.genre_id}`, setGenre);
        setItem(`${url}/subgenres/${artist.subgenre_id}`, setSubgenre);
        
        markSong('bangers', setBanger);
        markSong('crap', setCrap);
        
        if (subgenre) {
            if (secondChoice) {
                if (subgenre.inspiration_id === genreChoice.id ||
                    subgenre.inspiration_id === secondChoice.id)
                    setRelated(song);
            }
            else if (!secondChoice) {
                if (song === banger)
                    setRelated(song);
            }
        }
        else setRelated({});

        setShow(filtered // If filtered, show related music if it's in a subgenre
            ? liked || related.id > 0
            : genre
        );
    }, [filtered]);

    const handleLike = () => {
        if (song === banger)
            axios.post(`http://localhost:8080/unlike/${song.artist_id}/${sessionStorage.getItem('username')}`)
            .then(setLiked(''))
            .catch(err => console.error(err));
        else
            axios.post(`http://localhost:8080/like/${song.artist_id}/${song.genre_id}/${subgenre.inspiration_id}/${sessionStorage.getItem('username')}`)
            .then(setLiked('liked'))
            .catch(err => console.error(err));
    }

    const handleHate = () => {
        if (song === crap)
            axios.post(`http://localhost:8080/unhate/${song.artist_id}/${sessionStorage.getItem('username')}`)
            .then(setHated(''))
            .catch(err => console.error(err));
        else
            axios.post(`http://localhost:8080/hate/${song.artist_id}/${song.genre_id}/${sessionStorage.getItem('username')}`)
            .then(setHated('hated'))
            .catch(err => console.error(err));
    }
    
    if (show && song !== crap)
        return (<div className="song">
            <div className="song-contents">
                <span className="song-filterer"></span>
                <span className="song-info">
                    <p>{song && song.song_name}</p>
                    <p>{artist && artist.artist_name}</p>
                    <p>{subgenre ? subgenre.subgenre_name : genre && genre.genre_name}</p>
                </span>
                <span className="song-filterer">
                    {sessionStorage.getItem('username') && <img className={liked} src={like} onClick={() => handleLike()} alt="like" />}
                    {sessionStorage.getItem('username') && <img className={hated} src={hate} onClick={() => handleHate()} alt="hate" />}
                </span>
            </div>
            <MusicPlayer song={song.song_name} />
        </div>)
}

export default Song;