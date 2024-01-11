import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { SonglistContext } from "../Context/PlayerContext";
import "./SearchBar.css";
import { Padding } from "@mui/icons-material";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const {SetSongList} = useContext(SonglistContext);
  const fetchData = (value) => {
    fetch("https://academics.newtonschool.co/api/v1/music/song?&limit=99", {
      headers: {
        projectId: "knjxpr9vh9wr",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const dataArray = json.data; 
        const results = dataArray.filter((song) => {
          return (
            value &&
            song &&
            song.title &&
            song.title.toLowerCase().includes(value)
          );
        });
        setResults(results);
        SetSongList(results);
      });
  };
  

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        style={{ padding: 10, fontSize: 13 }} // Use camelCase for inline styles
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
