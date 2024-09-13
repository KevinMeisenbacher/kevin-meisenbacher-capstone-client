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
    const [banger, setBanger] = useState({});
    const [crap, setCrap] = useState({});

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

        // Get songs that are liked by the user
        axios.get(`${url}/bangers/${sessionStorage.getItem('username')}`)
        .then(response => {
            const { data } = response;
            for (let i=0; i<data.length; i++){
                console.log(data[i]);
                if (data[i].artist_id === song.artist_id){ 
                    setBanger(song);
                }
            }
        })
        .catch(err => console.error(err));
        console.log('banger', banger);

        // Get songs that are hated by the user
        axios.get(`${url}/crap/${sessionStorage.getItem('username')}`)
        .then(crapResponse => {
            const { data } = crapResponse;
            for (let j=0; j<data.length; j++){
                console.log(data[j]);
                if (data[j].artist_id === song.artist_id){
                    setCrap(song);
                }
            }
        })
        .catch(err => console.error(err));
        console.log('crap', crap);
        
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
    }, [!subgenre, filtered, crap]);

    const handleLike = () => {
        if (song === banger)
            axios.post(`http://localhost:8080/unlike/${song.artist_id}/${song.genre_id}/${sessionStorage.getItem('username')}`)
        else
            axios.post(`http://localhost:8080/like/${song.artist_id}/${song.genre_id}/${sessionStorage.getItem('username')}`)
    }

    const handleHate = () => {
        if (song === crap)
            axios.post(`http://localhost:8080/unhate/${song.artist_id}/${song.genre_id}/${sessionStorage.getItem('username')}`)
        else
            axios.post(`http://localhost:8080/hate/${song.artist_id}/${song.genre_id}/${sessionStorage.getItem('username')}`)
    }
    
    if (show && song !== crap)
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