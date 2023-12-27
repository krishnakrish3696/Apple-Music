import React from 'react'
import { useState, useRef, useContext, useEffect } from 'react';
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

import {
  styled, Typography, Slider,
  Paper, Stack, Box
} from '@mui/material';
import { Preview } from '@mui/icons-material';

const PSlider = styled(Slider)(({theme, ...props}) => ({
  color: 'Gray',
  height: 3,
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
   // const [index, setIndex] = useState(0);
     let index = 0;
    const {song} = useContext(PlayerContext);
    const {SetSong} = useContext(PlayerContext);
    const {songlist} = useContext(SonglistContext)
    const [currentSong, setSong] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(30);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);

    console.log(songlist);
    console.log(song);
    if(songlist && song)
    {
      for(let i=0; i<20; i++){
        if(song?.songid == songlist[i]?._id)
        {
          console.log(i);
            index = i;
        }
      }
    }

    useEffect(()=>{
      if(audioRef){
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
        console.log(songlist[index + 1]._id);
          let songid = songlist[index + 1]._id;
          SetSong({songid});
      } 
  }

  const toggleSkipBackward = () => {
    console.log("Backward")
      if(index > 0) {
        let songid = songlist[index - 1]._id;
        SetSong({songid});
      }
  }

    async function getSongData() {
        try {
          const data = await fetch(
            `https://academics.newtonschool.co/api/v1/music/song/${song.songid}`,
            {
              headers: {
                projectId: "knjxpr9vh9wr",
              },
            }
          );
          const response = await data.json();
          setSong(response.data);
        } catch (error) {
          console.error("Error fetching song data:", error);
        }
      }
      
    useEffect(() => {
        getSongData();
      },[song]);

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
                <IconButton> <ShuffleIcon fontSize="Small"/></IconButton>
            </div>
            <div className="FastRewind">
                <IconButton> <FastRewindIcon onClick={toggleSkipBackward} fontSize="Medium" /></IconButton>
            </div>
            <div className="Play/Pause">
                {isPlaying ? (<IconButton> <PauseIcon onClick={togglePlay} fontSize='Large' /></IconButton>) : (<IconButton> <PlayArrowIcon onClick={togglePlay} /> </IconButton>)}
            </div>
            <div className="FastForward">
                <IconButton> <FastForwardIcon onClick={toggleSkipForward} fontSize="Medium" /></IconButton>
            </div>
            <div className="Loop">
                <IconButton> <LoopIcon fontSize="Small" /></IconButton>
            </div>
        </div>
        <div className="Music">
          <div className="logo">
            {currentSong && currentSong?.thumbnail ? (
              <img id="Songlogo" src={currentSong?.thumbnail} alt="Cover" />
            ) : (
              <img
                id="Songlogo"
                src="https://visualpharm.com/assets/62/Apple-595b40b75ba036ed117d984c.svg"
                alt="Cover"
              />
            )}
          </div>
          {currentSong ? <audio src={currentSong.audio_url} ref={audioRef} muted={mute} /> : null}

          <div className="songTitle">
            {currentSong && currentSong?.title ? <p>{currentSong?.title}</p> : null}
          </div>
          <div className="songDescription">
            {currentSong && currentSong?.mood ? <p>{currentSong?.mood}</p> : null}
          </div>
          <div className='MusicPlay'> 
            <Box sx={{ width: 500}}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <PSlider thumbless value={elapsed} max={duration}/>
              </Stack>
            </Box>
          </div>
        </div>
        <div className='VolumSlider'>
            <Box sx={{ width: 100 }}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <VolumeBtns/>
                <PSlider min={0} max={100} value={volume} onChange={(e, v) => setVolume(v)}/>
              </Stack>
            </Box>
        </div>
    </div>
  )
}

export default Controls
