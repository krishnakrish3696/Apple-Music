import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
    {results.map((result, id) => {
      return <SearchResult id={result._id} result={{ title: result.title, _id: result._id }} key={id} />;
    })}
  </div>
  
  );
};
 