import React, { useContext, useEffect, useState} from "react";
import {Link, NavLink } from "react-router-dom";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import '../Styles/HomePage.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import PlayerContext from "../Context/PlayerContext";


const SimpleSlider = (props) => {
  const [songid, setSongId] = useState('')
  const {SetSong} = useContext(PlayerContext);
  const navigate = useNavigate();
  const { category, title } = props.categories;
  let cat = category;
  cat = cat[0].toUpperCase() + cat.slice(1);
  const [allsong, setAllSongs] = useState([]);
  async function getCatergoryData() {
    const data = await fetch( 
      `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${category}"}`,
      {
        headers: {
          projectId: "knjxpr9vh9wr",
        },
      }
    );
    const response = await data.json();
    setAllSongs(response.data);
  }

  useEffect(() => {
    getCatergoryData();
  }, []);

  const handleCardClick = (id) => {
    SetSong(id);
    navigate(`/AlbumDetail`)
  }

  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div> 
        <Link to={{
                pathname: "AllCards",
                search: category,
                }}><h3 id="catergoryname">{cat}</h3>
        </Link>
      </div>
      <Slider {...settings}>
        {allsong?.map((item) => {
          const state = { stateParam: item._id };
          return (
            <div>
              <Card sx={{ width: 220, height: 220, borderRadius: 2 }}>               
                <CardActionArea style={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        height="220"
                        image={item.thumbnail}
                        alt="green iguana"
                        onClick={() => {handleCardClick(item._id)}}
                    />
                    <IconButton style={{ position: 'absolute', top: '90%', left: '10%', transform: 'translate(-50%, -50%)', color: "white"}}>
                    <PlayCircleIcon onClick={() => {handleCardClick(item._id)}}
                        fontSize="large"
                    />
                    </IconButton>
                </CardActionArea>
              </Card>
              <p className="cardTitle">{item.title}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
