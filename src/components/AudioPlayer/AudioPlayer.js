import { useState } from "react";
import { tunes } from '../../data/tunes';

import DisplayTrack from "./DisplayTrack";
import Controls from './Controls';
import ProgressBar from './ProgressBar';

const AudioPlayer = () => {
    const [currentTrack, setCurrentTrack] = useState(tunes[0]);
    
    return (
      <div className="audio-player">
        <div className="audio-player__content">Audio player content</div>
            <DisplayTrack currentTrack={currentTrack} />
            <Controls />
            <ProgressBar />
      </div>
    );
  };
  export default AudioPlayer;