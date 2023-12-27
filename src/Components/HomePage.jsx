
import React, { useEffect, useState } from "react";
import '../Styles/HomePage.css';
import '../Styles/slick.css';
import '../Styles/slick-theme.css'
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Slider from "react-slick";
import { CardActionArea } from "@mui/material";
import SimpleSlider from './SimpleSlider';

function HomePage() {
  const [albums, setAlbums] = useState([])
    useEffect(() =>{
        fetch('https://academics.newtonschool.co/api/v1/music/album',{
            method:'GET',
            headers: {
                'projectId': 'knjxpr9vh9wr'
            }
        })
        .then(response => response.json())
        .then(data => setAlbums(data.data))
        .catch(err => console.log(err))
    }, []);
    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
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


    //Mood of songs
    const Moods = [{
        category:"romantic",title:"Romantic Songs",
    },
    {
        category:"happy",title:"Happy Songs",
    },
    {
        category:"sad",title:"Sad Songs",
    },
    {
        category:"excited",title:"excited Songs",
    }]

    return(
        <div className="MainContainersection">


            <div className="BrowserBanner">
                <h1>
                    Browse
                </h1>
                <hr/>
               <div>
                    <Slider {...settings}>
                        {albums?.map((item) => {
                            return (
                                <div>
                                    <div className="AlbumTitleandDescription">
                                        <h4>
                                            {item.description}
                                        </h4>
                                        <p>
                                            {item.title}
                                        </p>
                                    </div>
                                <Card sx={{ maxWidth: 750 }}>
                                    <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={item.image}
                                        alt="green iguana"
                                    />
                                    </CardActionArea>
                                </Card>
                                </div>
                            );
                        })}
                    </Slider>
               </div>
            </div>



            <div className="NewMusicAlbum">
                <h3>
                    New Music
                </h3>
                <hr/>
                <div>   
                    {
                        Moods.map((item)=> <SimpleSlider categories={item} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage
