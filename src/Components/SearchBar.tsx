import { useState, useRef, useEffect } from "react";
import classes from "./SearchBar.module.css";
import { Search } from "react-bootstrap-icons";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  detectOnAbortingSearch(wrapperRef);

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

  function detectOnAbortingSearch(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsUserSearching(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div className={classes.searchBar} ref={wrapperRef}>
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
            <Link
              to={`/profile/${result.id}`}
              key={result.id}
              className={classes.searchResult}
            >
              <Avatar userId={result.id} />
              {result.username}
            </Link>
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
