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
        icon: <IconButton> <WatchLaterOutlinedIcon fontSize='small'/> </IconButton>,
        name: "Recently Saved",
    },
];

const PlayListItems = [
    {
        id:1,
        icon:<IconButton> <QueueMusicIcon fontSize='small'/> </IconButton>,
        name: "Romantic!",
    },
    {
        id:2,
        icon:<IconButton> <QueueMusicIcon fontSize='small'/> </IconButton>,
        name: "Happy!",
    },
    {
        id:3,
        icon:<IconButton> <QueueMusicIcon fontSize='small'/> </IconButton>,
        name: "Sad",
    },
    {
        id:4,
        icon:<IconButton> <AddIcon fontSize='small'/> </IconButton>,
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
  const navigate = useNavigate();
  return (
    <div className="leftMenu">                
        <div className = "logoContainer" >
            <i>
                <CloudQueueIcon/>
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
                <BrowseIcon/>
            </i>
        </div>

        <div className="listsContainer">
            <p className="title">LIBRARY</p>
            <ul>
                {Menulist &&
                Menulist.map((menu) =>(
                    <li>
                        {" "}
                        <a href="#">
                            <i>{menu.icon}</i>
                            <span>{menu.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        
        <div className="listsContainer">
            <p className="title">PlayList</p>
            <ul>
                {PlayListItems &&
                PlayListItems.map((playlist) =>(
                    <li>
                        <a href="#">
                            <Link to={{ pathname: "AllCards", 
                            search: playlistname(playlist.id) }}>
                                <i>{playlist.icon}</i>
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
