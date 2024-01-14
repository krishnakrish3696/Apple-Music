import React from 'react'
import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LoopIcon from "@mui/icons-material/Loop";
import IconButton from "@mui/material/IconButton";
import PauseIcon from "@mui/icons-material/Pause";
import '../Styles/Controls.css';
import PlayerContext from '../Context/PlayerContext';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { SonglistContext } from '../Context/PlayerContext';
import UseModal from '../Components/SigninPopup';

import {
  styled, Typography, Slider,
  Paper, Stack, Box
} from '@mui/material';
import { Preview } from '@mui/icons-material';

const PSlider = styled(Slider)(({theme, ...props}) => ({
  color: 'Gray',
  height: 2,
  '&:hover': {
      cursor: 'auto',
      color: 'Black'  
  },
  '& .MuiSlider-thumb': {
      width: '12px',
      height: '12px',
      display: props.thumbless ? 'none' : 'block',
  }
}))

function Controls() {
    const [mute, setMute] = useState(false);
    const audioRef = useRef(null);
     let index = 0;
    const {song} = useContext(PlayerContext);
    const {SetSong} = useContext(PlayerContext);
    const {songlist} = useContext(SonglistContext)
    const [currentSong, setSong] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(30);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);
    const navigate = useNavigate();
    const Username = localStorage.getItem("Token");

    if(songlist && song)
    {
      for(let i=0; i<songlist.length; i++){
        if(song?.songid === songlist[i]?._id)
        {
            index = i;
        }
      }
    }

    useEffect(()=>{
      if(audioRef.current){
          audioRef.current.volume = volume / 100;
      }
      if(isPlaying){
        setInterval(() => {
            const _duration = Math.floor(audioRef?.current?.duration);
            const _elapsed = Math.floor(audioRef?.current?.currentTime);
            setDuration(_duration);
            setElapsed(_elapsed);
        }, 100);
    }
    },[volume,isPlaying]);

    const togglePlay = () => {
      if(!isPlaying){
         audioRef.current.play()
      }else{
        audioRef.current.pause()
      }
      setIsPlaying(prev => !prev)
    }

    const toggleSkipForward = () => {

      if(index <= songlist.length - 1) {
          let songid = songlist[index + 1]._id;
          SetSong({songid});
      } 
  }

  const handleLogout = () => {
    localStorage.removeItem("UserData");
    localStorage.removeItem("Token");
    navigate(`/`)
  }

  const toggleSkipBackward = () => {
      if(index > 0) {
        let songid = songlist[index - 1]._id;
        SetSong({songid});
      }
  }

    async function getSongData() {
        try {
          const data = await fetch(
            `https://academics.newtonschool.co/api/v1/music/song/${song?.songid}`,
            {
              headers: {
                projectId: "knjxpr9vh9wr",
              },
            }
          );
          const response = await data.json();
          setSong(response.data);
          if(response.data)
          {
              setIsPlaying(true);
          }
        } catch (error) {
          console.error("Error fetching song data:", error);
        }
      }
      
    useEffect(() => {
        getSongData();
      },[song]);
    useEffect(() => {
      getSongData();
    },[]);

      function VolumeBtns(){
        return mute
            ? <VolumeOffIcon sx={{color: 'Gray', '&:hover': {color: 'Black'}}} onClick={() => setMute(!mute)} />
            : volume <= 20 ? <VolumeMuteIcon sx={{color: 'Gray', '&:hover': {color: 'Black'}}} onClick={() => setMute(!mute)} />
            : volume <= 75 ? <VolumeDownIcon sx={{color: 'Gray', '&:hover': {color: 'Black'}}} onClick={() => setMute(!mute)} />
            : <VolumeUpIcon sx={{color: 'Gray', '&:hover': {color: 'Black'}}} onClick={() => setMute(!mute)} />
      }
  return (
    <div className='Topbarsection'>
        <div className="MusicPlayersection">
        <div className="Shuffle">
            <IconButton disabled={!currentSong?.audio_url}>
                <ShuffleIcon style={{ fontSize: 'large' }}/>
            </IconButton>
        </div>
        <div className="FastRewind">
            <IconButton disabled={!currentSong?.audio_url}>
                <FastRewindIcon onClick={toggleSkipBackward} style={{ fontSize: 'large' }} />
            </IconButton>
        </div>
        <div className="Play/Pause">
            {currentSong?.audio_url ? (
                <IconButton>
                    {isPlaying ? (
                        <PauseIcon onClick={togglePlay} style={{ fontSize: 'large'}} />
                    ) : (
                        <PlayArrowIcon style={{ fontSize: 'large'}}  onClick={togglePlay} />
                    )}
                </IconButton>
            ) : (
                <IconButton disabled>
                    <PlayArrowIcon style={{ fontSize: 'large'}}  />
                </IconButton>
            )}
        </div>
        <div className="FastForward">
            <IconButton disabled={!currentSong?.audio_url}>
                <FastForwardIcon onClick={toggleSkipForward} style={{ fontSize: 'large' }}/>
            </IconButton>
        </div>
        <div className="Loop">
            <IconButton disabled={!currentSong?.audio_url}>
                <LoopIcon style={{ fontSize: 'large' }} />
            </IconButton>
        </div>
    </div>
    {currentSong && currentSong?.thumbnail?
        <div className="Music">
          <div className="logo">
            {currentSong && currentSong?.thumbnail ? (
              <img id="Songlogo" src={currentSong?.thumbnail} alt="Cover" />
            ) : (
             null
            )}
          </div>
          {currentSong ? <audio src={songlist[index]?.audio_url} ref={audioRef} autoPlay={true} muted={mute} /> : null}

          <div className="songTitle">
            {currentSong && currentSong?.title ? <p>{currentSong?.title}</p> : null}
          </div>
          <div className="songDescription">
            {currentSong && currentSong?.mood ? <p>{currentSong?.mood}</p> : null}
          </div>
          <div className='MusicPlay'> 
          {currentSong ?
            <Box sx={{ width: 490}}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                {elapsed == duration? toggleSkipForward : null }
                <PSlider thumbless value={elapsed} max={duration}></PSlider>
              </Stack>
            </Box>
            : null}
          </div>
        </div> :
          <div className="Music">
              <div className='applelogo'>
              <img id="Songlogo"
                  src="https://visualpharm.com/assets/62/Apple-595b40b75ba036ed117d984c.svg"
                  alt="Cover"
                />
                </div>
          </div>
        }
        <div className='VolumSlider'>
            <Box sx={{ width: 100 }}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <VolumeBtns style={{ fontSize: 'medium'}}/>
                <PSlider min={0} max={100} value={volume} onChange={(e, v) => setVolume(v)}/>
              </Stack>
            </Box>
        </div>
        <div className='signin'>
          {Username == null ? (
            <UseModal className='logout' />
          ) : (
            <button className='logout' onClick={handleLogout}>LogOut</button>
          )}
        </div>
    </div>
  )
}

export default Controls
