import PlaySidebar from "./Layout/PlaySidebar";
import { motion } from "framer-motion";
import classes from "./PlayLandingPage.module.css";
import { useState, useEffect } from "react";
import Playlist from "./Layout/Playlist";

interface playlist {
  id: number;
  name: string;
  image: string;
  additionalComment: string;
  difficulty: string;
  description: string;
  author: string;
  updatedAt: string;
  Challenges: challenge[];
}

interface challenge {
  id: number;
  name: string;
  challangeImageUrl: string;
  challengeInPlaylistId: number;
}

export default function PlayLandingPage() {
  const [difficulty, setDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [playlists, setPlaylists] = useState<playlist[]>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<playlist[]>([]);

  const fetchPlaylists = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/play/playlists`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setPlaylists(data);
    setFilteredPlaylists(data);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    setFilteredPlaylists(
      playlists.sort((a, b) => {
        if (sortBy === "newest") {
          return +new Date(b.updatedAt) - +new Date(a.updatedAt);
        } else {
          return +new Date(a.updatedAt) - +new Date(b.updatedAt);
        }
      })
    );

    setFilteredPlaylists(
      playlists.filter((playlist) => {
        if (difficulty.toLowerCase() === "all") {
          return true;
        } else {
          return playlist.difficulty.toLowerCase() === difficulty.toLowerCase();
        }
      })
    );
  }, [difficulty, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={classes.main}
    >
      <PlaySidebar setDifficulty={setDifficulty} setSortBy={setSortBy} />
      <div className={classes.playlists}>
        {filteredPlaylists ? filteredPlaylists.map((playlist) => {
          return (
            <div
              key={playlist.id}
              className={classes.uselessWrapperThatIsNeededBecauseOfKey}
            >
              <Playlist
                id={+playlist.id}
                name={playlist.name}
                image={playlist.image}
                difficulty={playlist.difficulty}
                description={playlist.description}
                additionalComment={playlist.additionalComment}
                publishDate={playlist.updatedAt}
                author={playlist.author}
                challenges={playlist.Challenges}
              />
            </div>
          );
        }) : <p>We found no playlist that matches your criteria!</p>}
      </div>
    </motion.div>
  );
}
