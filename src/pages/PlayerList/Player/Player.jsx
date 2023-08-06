import React, {useEffect, useState} from 'react';
import './Player.css'

const AlbumArt = ({imageUrl, isActive}) => {
  return (
    <img
      className={`album-art ${isActive ? 'active' : ''}`}
      src={imageUrl}
      alt="album art"
    />
  );
};


const SongInfo = ({songs, artists, currentSong}) => {
  return (
    <div className="info">
      <hgroup className="info__left">
        <h1 className="info__song">
          {songs.map((song, index) => (
            <span key={index} className={`song ${currentSong === index ? 'active' : ''}`}>
              {song}
            </span>
          ))}
        </h1>
        <h2 className="info__artist">
          {artists.map((artist, index) => (
            <span key={index} className={`artist ${currentSong === index ? 'active' : ''}`}>
              {artist}
            </span>
          ))}
        </h2>
      </hgroup>
      {/* ... other elements ... */}
    </div>
  );
};
const ProgressBar = ({position, maxPosition, sliderChange}) => {
  return (
    <div className="progress">
      <input id="slider" type="range" value={position} min="0" max={maxPosition} step="1" onChange={sliderChange}/>
    </div>
  );
};

const Controls = ({previous, play, next, playing}) => {
  return (
    <div className="controls">
      <button className="controls__round-button" id="previous-button" onClick={previous}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.13672 5L9.5 0.5V9.5L3.13672 5ZM0.5 0.5H2.01172V9.5H0.5V0.5Z"/>
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      <button className="controls__round-button controls__round-button--large" id="play-button" onClick={play}>
        <div className="play" style={{display: playing ? "none" : "block"}}>
          <svg className="controls__play" width="14" height="18" viewBox="0 0 14 18" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M0.0195312 0.269531L13.7305 9L0.0195312 17.7305V0.269531Z"/>
          </svg>
          <span className="sr-only">Play</span>
        </div>
        <div className="pause" style={{display: playing ? "block" : "none"}}>
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5195 0.269531H15.5V17.7305H10.5195V0.269531ZM0.5 17.7305V0.269531H5.48047V17.7305H0.5Z"
                  fill="#728C98"/>
          </svg>
          <span className="sr-only">Pause</span>
        </div>
      </button>
      <button className="controls__round-button" id="next-button" onClick={next}>
        <svg aria-hidden="true" focusable="false" width="10" height="10" viewBox="0 0 10 10" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M7.98828 0.5H9.5V9.5H7.98828V0.5ZM0.5 9.5V0.5L6.86328 5L0.5 9.5Z"/>
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

const Device = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const maxSong = 2; // You can change this based on the number of album-art images you have
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const maxPosition = 1800; // Maximum position value for the slider

  const songs = ["No Reptiles", "Gosh", "Norrland"];
  const artists = ["Everything Everything", "Jamie xx", "Gidge"];
  const images = ["https://res.cloudinary.com/andrewcanham/image/upload/v1579132801/everything-everything.jpg", "https://res.cloudinary.com/andrewcanham/image/upload/v1579132801/jamie-xx.jpg", "https://res.cloudinary.com/andrewcanham/image/upload/v1579132801/gidge.jpg"]

  const play = () => {
    // setPause(pause => !pause);
    setPlaying(playing => !playing);
  };

  const previous = () => {
    // updateDOM('remove');
    let newCurrentSong = currentSong - 1;
    if (newCurrentSong < 0) {
      newCurrentSong = maxSong;
    }
    setCurrentSong(newCurrentSong);
    // updateDOM('add');
    setPosition(0);
    setPlaying(true);
  };

  const next = () => {
    // updateDOM('remove');
    let newCurrentSong = currentSong + 1;
    if (newCurrentSong > maxSong) {
      newCurrentSong = 0;
    }
    setCurrentSong(newCurrentSong);
    // updateDOM('add');
    setPosition(0);
    setPlaying(true);
  };

  let timer = null;
  const playBar = () => {
    if (playing) {
      timer = setTimeout(() => {
        setPosition(prevPosition => {
          let newPosition = prevPosition + 1;
          if (newPosition > maxPosition) {
            newPosition = 0;
            next();
          }
          return newPosition;
        });
        playBar();
      }, 10);
    }
  };

  const sliderChange = (event) => {
    setPosition(event.target.value);
    console.log(event.target.value)
  };

  useEffect(() => {
    playBar();
    return () => {
      clearTimeout(timer);
    };
  }, [playing])

  return (
    <section className="device">
      <div className="device__top">
        {images.map((url, index) => (
          <AlbumArt key={index} imageUrl={url} isActive={currentSong === index}/>
        ))}
      </div>
      <div className="device__mid">
        <SongInfo songs={songs} artists={artists} currentSong={currentSong}/>
      </div>
      <div className="device__bottom">
        <ProgressBar position={position} maxPosition={maxPosition} sliderChange={sliderChange}/>
        <div className="equaliser"></div>
        <Controls previous={previous} play={play} next={next} playing={playing}/>
      </div>
    </section>
  );
};

export default Device;
