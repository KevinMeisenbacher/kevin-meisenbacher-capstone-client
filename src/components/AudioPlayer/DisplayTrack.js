const DisplayTrack = ({ currentTrack }) => {
    return (
      <div>
        <audio src={currentTrack.src} />
      </div>
    );
  };
  export default DisplayTrack;