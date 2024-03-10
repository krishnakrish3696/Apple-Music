import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import SongDurationComponent from "./SongDuration";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from "react-router-dom";
import { FavContext, SonglistContext } from "../Context/PlayerContext";
import PlayerContext from "../Context/PlayerContext";
import IconButtonMenu from "./Moremenu";
import IconButton from "@mui/material/IconButton";

//This componenet will return list of sings to album detail page and context API page.
const SongsList = (props) => {
  const mood = props.data;
  const Token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const [songid, setSongId] = useState('');
  const {SetSongList} = useContext(SonglistContext);
  const {SetSong} = useContext(PlayerContext);
  const [allsong, setAllSongs] = useState([]);
  async function getCatergoryData() {
    const data = await fetch(
      `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${mood}"}`,
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
  },[props.data]);

  
  const handleMusic = () => {
    SetSong({songid})
  }
  
  return (
    <Container>
       <div className="list">
          <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>Song</span>
              </div>
              <div className="col">
                <span>Artist</span>
              </div>
              <div className="col">
                <span>Time</span>
              </div>
              {Token ?
              <div className="='col">
                <span>More</span>
              </div> :
              null}
            </div>
            <div className="tracks">
            {allsong?.map((item, index) => (
              <div className="row" key={index}>
                <div className="col" onClick={() => {setSongId(item._id); navigate(`/AlbumDetail`); handleMusic()}}>
                  <span>{index + 1}</span>
                </div>
                <div className="col detail" onClick={() => {setSongId(item._id); navigate(`/AlbumDetail`); handleMusic()}}>
                  <div className="image">
                    <img src={item.thumbnail} alt="track" />
                  </div>
                  <div className="info">
                    <span className="name">{item.title}</span>
                  </div>
                </div>
                <div className="col" onClick={() => {setSongId(item._id); navigate(`/AlbumDetail`); handleMusic()}}>
                  {item.artist.map((data) => 
                    <span key={data.id}>{data.name},</span>
                  )}
                </div>
                <div className="col" onClick={() => {setSongId(item._id); navigate(`/AlbumDetail`); handleMusic()}}>
                  <span>{<SongDurationComponent audioUrl={item.audio_url}/>}</span>
                </div>
                <div className="col">
                    {Token ? <IconButtonMenu style={{fontSize:'18px', color: 'gray'}} data={item._id} /> : null}
                </div>
              </div>
            ))}
            </div>
       </div>
    </Container>
  );
};

export default SongsList;


const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 2fr 2fr 0.5fr 0.5fr;
      margin: 1rem 0 0 0;
      color: rgba(0,0,0,.56);
      top: 15vh;
      padding: 1rem;
      transition: 0.3s ease-in-out;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0;
      line-height: 1.25;
    }
    .tracks {
      margin: 0;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.25rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 2fr 2fr 0.5fr 0.5fr;
        &:hover {
          background-color: #f1efef99;
          cursor:pointer;
        }
        .col {
          display: flex;
          align-items: center;
          color: rgba(0,0,0,.88);
          font-size: 12px;
          img {
            height: 40px;
            width: 40px;
          }
          
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            align-items: center;
            display: inline-flex;
            grid-area: song-name;
            line-height: 16px;
            max-width: 100%;
            overflow: hidden;
            font-size: 12px;
          }
        }
      }
    }
  }
`;
