import { useState, useRef } from "react";
import classes from "./SearchBar.module.css";
import { Search } from "react-bootstrap-icons";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

interface result {
  id: number;
  name?: string;
  lastname?: string;
  username: string;
}

export default function SearchBar() {
  const [isUserSearching, setIsUserSearching] = useState<boolean>(false);
  const [results, setResults] = useState<Array<result>>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchResults = async () => {
    if (searchInputRef.current?.value === "") {
      setResults([]);
      return;
    }
    await fetch(
      `${process.env.REACT_APP_API_URL}/search?search=${searchInputRef.current?.value}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div
      className={classes.searchBar}
      onMouseLeave={() => setIsUserSearching(false)}
    >
      <input
        type="text"
        placeholder="Search"
        ref={searchInputRef}
        onFocus={() => setIsUserSearching(true)}
        onChange={fetchResults}
      />
      <Search />
      {isUserSearching && results.length > 0 && (
        <div className={classes.searchResults}>
          {results.map((result) => (
            <div key={result.id} className={classes.searchResult}>
              <Link to={`/profile/${result.id}`}>{result.username}</Link>
            </div>
          ))}
        </div>
      )}
      {searchInputRef.current?.value && results.length === 0 && (
        <div className={classes.searchResults}>
          <p>No results found</p>
        </div>
      )}
    </div>
  );
}
