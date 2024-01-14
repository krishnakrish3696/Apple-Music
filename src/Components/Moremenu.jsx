import * as React from 'react';
import { useState } from 'react';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';

export default function IconButtonMenu(props) { 
const songId = props.data;
const Token = localStorage.getItem("Token");
const apiUrl = 'https://academics.newtonschool.co/api/v1/music/favorites/like';
const jwtToken = Token; // Replace with your actual JWT token
const projectId = 'knjxpr9vh9wr'; // Replace with your actual project ID

const handleClick = async () =>{
    try {
        const response = await fetch(apiUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`,
            'projectID': projectId,
          },
          body: JSON.stringify({ "songId": songId }),
        });
    
        if (response.ok) {
          console.log(response);
        } else {
          console.error('Error liking song');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  return (
    <>
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { color: 'grey' } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu>
        <MenuItem sx={{fontWeight:'bold'}}>Add to Playlist</MenuItem>
      {Token? <MenuItem onClick={handleClick}>Add/Remove</MenuItem> : null}
      </Menu>
    </Dropdown>
    </>
  );
}