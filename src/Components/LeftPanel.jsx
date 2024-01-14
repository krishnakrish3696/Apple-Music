import React, {useState} from 'react'
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import {Link, NavLink } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import BrowseIcon from '@mui/icons-material/ViewAgendaOutlined';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResultsList } from '../SearchBar/SearchResultsList';
import '../Styles/leftPanel.css';

const Menulist = [
    {
        id:1,
        icon: <IconButton style={{ color: 'red' }}> <WatchLaterOutlinedIcon fontSize='small'/> </IconButton>,
        name: "My Favourites",
    },
];

const PlayListItems = [
    {
        id:1,
        icon:<IconButton style={{ color: 'red' }}> <QueueMusicIcon fontSize='small'/> </IconButton>,
        name: "Romantic!",
    },
    {
        id:2,
        icon:<IconButton style={{ color: 'red' }}> <QueueMusicIcon fontSize='small'/> </IconButton>,
        name: "Happy!",
    },
    {
        id:3,
        icon:<IconButton style={{ color: 'red' }}> <QueueMusicIcon fontSize='small'/> </IconButton>,
        name: "Sad",
    },
    {
        id:4,
        icon:<IconButton style={{ color: 'red' }}> <AddIcon fontSize='small'/> </IconButton>,
        name: "Excited",
    },
];

function playlistname(id)
{
    let name = ''
    if(id ===1)
    {
        name = 'romantic';
    }
    else if( id === 2)
    {
        name = 'happy';
    }
    else if( id===3)
    {
        name = 'sad';
    }
    else
    {
        name='excited';
    }
    return name;
}

function LeftPanel() {
  const [results, setResults] = useState([]);
  const Token = localStorage.getItem("Token");
  return (
    <div className="leftMenu">                
        <div className = "logoContainer" >
            <i>
            <img
                id="Songlogo"
                src="https://visualpharm.com/assets/62/Apple-595b40b75ba036ed117d984c.svg"
                alt="Cover"
              />
            </i>
            <h2>Music</h2>
        </div>
        <div className="searchBox">
            <SearchBar setResults={setResults} />
            {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
        <div className="BrowseSection">
            <button className="BrowseButton" type="submit">Browse</button>
            <i className="BrowseIcon">
                <BrowseIcon id="Browse-btn" color='red'/>
            </i>
        </div>
        {Token?
        <div className="listsContainer">
            <p className="title">LIBRARY</p>
            <ul>
                {Menulist &&
                Menulist.map((menu) =>(
                    <li>
                        {" "}
                        <a href="#">
                            <Link to={{ pathname: "MyFav" }}>
                                <i>{menu.icon}</i>
                                <span>{menu.name}</span>
                            </Link>
                        </a>
                    </li>
                ))}
            </ul>
        </div> : null }
        
        <div className="listsContainer">
            <p className="title">PlayList</p>
            <ul>
                {PlayListItems &&
                PlayListItems.map((playlist) =>(
                    <li>
                        <a href="#">
                            <Link to={{ pathname: "AllCards", 
                            search: playlistname(playlist.id) }}>
                                <i className="PlaylistIcon">{playlist.icon}</i>
                                <span>{playlist.name}</span>
                            </Link>
                        </a>
                    </li>
                ))}
            </ul>
        </div>     
    </div>
  )
}

export default LeftPanel
