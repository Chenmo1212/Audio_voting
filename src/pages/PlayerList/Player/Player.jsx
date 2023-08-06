import React, {useEffect, useRef, useState} from 'react';
import './Player.css'

const AlbumArt = ({imageUrl}) => {
  return (
    <img
      className={`album-art active`}
      src={imageUrl}
      alt="album art"
    />
  );
};


const SongInfo = ({song, artist}) => {
  return (
    <div className="info text-center mt-8">
      <hgroup className="info__left m-auto">
        <h1 className="info__song text-xl">
          <div className="song active text-center">
            {song}
          </div>
        </h1>
        {/*<h2 className="info__artist">*/}
        {/*  <div className="artist active text-center">*/}
        {/*      {artist}*/}
        {/*    </div>*/}
        {/*</h2>*/}
      </hgroup>
    </div>
  );
};
const ProgressBar = ({position, maxPosition, sliderChange}) => {
  const progress = (position / maxPosition) * 100;
  return (
    <>
      <div className="progress">
        <div className="time-display flex justify-between">
          <span className="start text-xs">{formatTime(position)}</span>
          <span className="start text-xs">{formatTime(maxPosition)}</span>
        </div>
        <div className="played-progress-container relative">
          <div
            className="played-progress absolute"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <input id="slider" type="range" value={position} min="0" max={maxPosition} step="1" onChange={sliderChange}/>
      </div>
    </>
  );
};

const Controls = ({previous, play, pause, next, playing}) => {
  return (
    <div className="controls">
      <button className="controls__round-button" id="previous-button" onClick={previous}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.13672 5L9.5 0.5V9.5L3.13672 5ZM0.5 0.5H2.01172V9.5H0.5V0.5Z"/>
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      <button className="controls__round-button controls__round-button--large" id="play-button"
              onClick={ () => playing ? pause() : play() }>
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

const formatTime = (timeInMillis) => {
  const totalSeconds = Math.floor(timeInMillis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

const Player = ({user, toNext, toPrev, isActive}) => {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [maxPosition, setMaxPosition] = useState(1800);
  const audioRef = useRef(null);

  const play = () => {
    setPlaying(true);
    audioRef.current.play();
  };
  const pause = () => {
    setPlaying(false);
    audioRef.current.pause();
    clearInterval(timer);
  };

  const previous = () => {
    setPosition(0);
    setPlaying(false);
    toPrev()
  };

  const next = () => {
    setPosition(0);
    setPlaying(false);
    toNext()
  };

  const stop = () => {
    setPosition(0);
    pause()
  }

  let timer = null;
  const playBar = () => {
    if (playing) {
      audioRef.current.play().then(() => {
        timer = setInterval(() => {
          let curr = audioRef.current.currentTime * 1000;
          if (curr < maxPosition) {
            setPosition(curr);
          } else {
            pause();
          }
        }, 10);
      }).catch((error) => {
        console.error('Audio playback failed:', error);
      });
    } else {
      pause()
    }
  };

  const sliderChange = (event) => {
    const newPosition = parseInt(event.target.value);
    setPosition(newPosition);
    audioRef.current.currentTime = newPosition / 1000;
    play()
  };

  useEffect(() => {
    playBar();
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [playing])

  useEffect(() => {
    audioRef.current.addEventListener('loadedmetadata', () => {
      setMaxPosition(audioRef.current.duration * 1000);
    });
  }, []);

  useEffect(() => {
    if (!isActive) {
      stop()
    }
    // eslint-disable-next-line
  }, [isActive]);

  return (
    <section className="device">
      <div className="device__top">
        <AlbumArt imageUrl={user.avatar}/>
      </div>
      <div className="device__mid">
        <SongInfo song={user.name} artist={user.name}/>
      </div>
      <div className="device__bottom">
        <ProgressBar position={position} maxPosition={maxPosition} sliderChange={sliderChange}/>
        <div className="equaliser"></div>
        <Controls previous={previous} play={play} pause={pause} next={next} playing={playing}/>
      </div>

      <audio ref={audioRef} src={user.url} controls className="hidden"/>
    </section>
  );
};

export default Player;
