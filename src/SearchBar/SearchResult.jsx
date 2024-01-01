import "./SearchResult.css";
import { useContext, useState } from "react";
import PlayerContext from "../Context/PlayerContext";

export const SearchResult = ({ result }) => {
  const [songid, setSongId] = useState('')
  const {SetSong} = useContext(PlayerContext);
  const handleMusic = () => {
    SetSong({songid})
  }
  return (
    <div
      className="search-result"
      onClick={(e) => {setSongId(result._id);handleMusic()}}
    >
      {result.title}
    </div>
  );
};
 