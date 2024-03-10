import React, {  useState, useEffect, useContext } from "react";
import {useLocation } from "react-router-dom";
import {Link } from "react-router-dom";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../Styles/AllCards.css";
import { SonglistContext } from "../Context/PlayerContext";
import PlayerContext from "../Context/PlayerContext";
import Footer from "./Footer";

//Here we rendered the all the songs based on the mood of the song as card format.
function AllCards () {
    const location = useLocation();
    var id = location.search.slice(1);
    const [allsong, setAllSongs] = useState([]);
    const {SetSongList} = useContext(SonglistContext);
    const [songid, setSongId] = useState('')
    const {SetSong} = useContext(PlayerContext);
    async function getCatergoryData() {
      const data = await fetch(
        `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${id}"}&limit=200`,
        {
          headers: {
            projectId: "knjxpr9vh9wr",
          },
        }
      );
      const response = await data.json();
      setAllSongs(response.data);
      SetSongList(response.data);
    }
  
    useEffect(() => {
      getCatergoryData();
    },[id]);

    const handleMusic = () => {
      SetSong({songid})
    }
    

    return (
      <div className="Detail">
        <div><h2 id="DetailID">{id.toUpperCase()}</h2></div>
        <div  style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '5px', paddingBottom: "200px" }}>
        {allsong?.map((item) => (
          <div key={item.id} className="CardDetail">
            <Card sx={{ width: 240, height: 240 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="240"
                  image={item.thumbnail}
                  alt="green iguana"
                  onClick={item._id != null ? () => {setSongId(item._id); handleMusic(); } : null}
                />
              </CardActionArea>
            </Card>
            <h5 className="cardTitle">{item.title}</h5>
          </div>
        ))}
      </div>
    </div>
    );
}

export default AllCards;