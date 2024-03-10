import React, { useState, useEffect } from "react";

//By using the this componenet geting the artist detail by passing song id to API
const Artists = (props) => {
  const songid = props.data; 
  console.log(songid);
  const [allartist, setartistname] = useState([]);
  async function getArtistDetails() {
    const data = await fetch(
      `https://academics.newtonschool.co/api/v1/music/song/${songid}`,
      {
        headers: {
          projectId: "knjxpr9vh9wr",
        },
      }
    );
    const response = await data.json();
    setartistname(response.data.artist);
  }

  useEffect(() => {
    getArtistDetails();
  },[props.data]);

  

  
  return (
   <>
        {allartist.map((data) => 
        <span key={data.id}>{data.name},</span>
        )}
   </>
  );
};

export default Artists;
