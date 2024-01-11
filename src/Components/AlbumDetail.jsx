import React from "react";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { memo } from "react";
import { useContext } from "react";
import '../Styles/AlbumDetail.css';
import PlayerContext from "../Context/PlayerContext";
import SongsList from "./SongList";


function AlbumDetail() {
    const {song} = useContext(PlayerContext);
    const [artistData, setArtistData] = useState({});
    const [songsData, setSongsData] = useState([]); 
    async function getAllmusic() {
    const data = await fetch(
        `https://academics.newtonschool.co/api/v1/music/song/${song}`,
        {
          headers: {
            projectId: "knjxpr9vh9wr",
          },
        })
        const response = await data.json();
        const artistData = response.data.artist.map(artist => {
            return {
              name: artist.name,
              description: artist.description,
              image: artist.image,
            };
          });
        setArtistData(artistData[0]);
        setSongsData(response.data);
      }
      useEffect(() => {
        getAllmusic();
      }, []);


    return (
        <div className="Detail">
            <div className="DetailTopSection">
                <div className="Detailcard" style={{position: "sticky"}}>
                    <Card sx={{ maxWidth: 270}}>
                        <CardActionArea>
                            <CardMedia
                            component="img" 
                            height="270"
                            image = {songsData.thumbnail}
                            alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                </div>
                <div className="AlbumTitle" style={{position: "sticky"}}>
                    <h1>{songsData.title}</h1>
                    <p>{artistData.name}</p>
                    <p id="songMoodandYear">{songsData.mood}</p>
                    <span id="songDescription">{artistData.description}</span>
                </div>
            </div>
            <div className="songlist">
                <SongsList data={songsData.mood}/>
            </div>
        </div>
    );
}

export default  memo(AlbumDetail);