import React from 'react'
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SearchIcon from '@mui/icons-material/Search';
import BrowseIcon from '@mui/icons-material/ViewAgendaOutlined';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
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
        id:1,
        icon:<IconButton> <QueueMusicIcon fontSize='small'/> </IconButton>,
        name: "Happy!",
    },
    {
        id:1,
        icon:<IconButton> <QueueMusicIcon fontSize='small'/> </IconButton>,
        name: "Sad",
    },
    {
        id:1,
        icon:<IconButton> <AddIcon fontSize='small'/> </IconButton>,
        name: "Excited",
    },
];


function LeftPanel() {
  return (
    <div className="leftMenu">                
        <div className = "logoContainer">
            <i>
                <CloudQueueIcon/>
            </i>
            <h2>Music</h2>
        </div>
        <div className="searchBox">
            <input type="text" placeholder="Search"/>
            <i className="searchIcon">
                <SearchIcon/>
            </i>
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
                        {" "}
                        <a href="#">
                            <i>{playlist.icon}</i>
                            <span>{playlist.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default LeftPanel
