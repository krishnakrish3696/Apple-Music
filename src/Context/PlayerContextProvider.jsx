import React,{useState} from "react";
import PlayerContext from "./PlayerContext";
import { SonglistContext } from "./PlayerContext";

const PlayerContextProvider = ({children}) =>{
    const [song,SetSong] = useState(null)
    const [songlist, SetSongList]= useState([]);
    return(
        <PlayerContext.Provider value={{song, SetSong}}>
            <SonglistContext.Provider value={{songlist, SetSongList}}>
                {children}
            </SonglistContext.Provider>
        </PlayerContext.Provider>

    )
}

export default PlayerContextProvider 