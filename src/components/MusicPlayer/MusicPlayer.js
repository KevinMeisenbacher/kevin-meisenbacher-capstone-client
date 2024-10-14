
import { useState, useEffect } from "react";
import useSound from 'use-sound';
import { tunes } from './MusicArray';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { IconContext } from "react-icons"; // for customizing the icons
import './MusicPlayer.scss';

const MusicPlayer = ({ song }) => {
  // Play/pause
  const [isPlaying, setIsPlaying] = useState(false);
  const track = tunes.find(tune => tune?.songName.includes(song || 'Flames'));
  const [play, { pause, duration, sound }] = useSound(track?.src);
    
  // Timeline
  const [currTime, setCurrTime] = useState({
      min: "",
      sec: "",
  }); // current position of the audio in minutes and seconds

  const [seconds, setSeconds] = useState(0); // current position of the audio in seconds

  // Play/Pause
  const playPause = () => {
        setIsPlaying(!isPlaying);
        isPlaying ? pause() : play();
  };

  const sec = duration / 1000;
  const min = Math.floor(sec / 60);
  const secRemain = Math.floor(sec % 60);
  const time = {
      min: min,
      sec: secRemain > 9 ? secRemain : `0${secRemain}`
  };

  // Keep grabbing current time
  useEffect(() => {
      const interval = setInterval(() => {
        if (sound) {
          setSeconds(sound.seek([])); // setting the seconds state with the current state
          const min = Math.floor(sound.seek([]) / 60);
          const sec = Math.floor(sound.seek([]) % 60);
          setCurrTime({
            min,
            sec,
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [sound]);

    return (
        <div className="component">
              <button className="playButton" onClick={() => playPause}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  {isPlaying 
                    ? <AiFillPauseCircle /> 
                    : <AiFillPlayCircle />
                  }
                </IconContext.Provider>
              </button>

            <div className="time">
                <p>
                    {currTime.min}:{currTime.sec > 9 
                    ? currTime.sec : `0${currTime.sec}`}
                </p>
            </div>
            <input
                type="range"
                min="0"
                max={duration / 1000}
                default="0"
                value={seconds}
                className="timeline"
                onChange={(e) => {
                    sound.seek([e.target.value]);
                }}
            />
            <p>
                {time.min}:{time.sec}
            </p>
        </div>
      );
}

export default MusicPlayer;