import React, { useState, useEffect, useContext } from "react";
import SongDurationComponent from "./SongDuration";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { SonglistContext } from "../Context/PlayerContext";
import PlayerContext from "../Context/PlayerContext";


const SongsList = (props) => {
  const mood = props.data;
  const navigate = useNavigate();
  const [songid, setSongId] = useState('')
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
    <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Song</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allsong?.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                  >
                  <TableCell component="th" scope="row" sx={{ minWidth: 400 }}>
                    <span onClick={() => {setSongId(item._id); navigate(`/AlbumDetail`); handleMusic()}}>{item.title}</span> 
                  </TableCell>
                  <TableCell>
                  {item.artist.map((data) => 
                       <span>{data.name},</span>
                      )}
                  </TableCell>
                  <TableCell align="right"><SongDurationComponent audioUrl={item.audio_url}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
};

export default SongsList;
