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
interface gameType {
  id: number;
  name: string;
  isActive: boolean;
}

export default function PlayLandingPage() {
  const [difficulty, setDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [playlists, setPlaylists] = useState<playlist[]>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<playlist[]>([]);
  const [gamesTypes, setGamesTypes] = useState<Array<gameType>>([
    {
      id: 1,
      name: "Official",
      isActive: true,
    },
    {
      id: 2,
      name: "Community",
      isActive: false,
    },
    {
      id: 3,
      name: "Learn",
      isActive: false,
    },
  ]);
  const [isComingSoon, setIsComingSoon] = useState<boolean>(false);

  const fetchPlaylists = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/play/playlists`,
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

    gamesTypes.forEach((gameType) => {
      if (gameType.isActive === true) {
        if (gameType.name === "Official") {
          setIsComingSoon(false);
        } else setIsComingSoon(true);
      }
    });
  }, [difficulty, sortBy, gamesTypes]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={classes.main}
    >
      <PlaySidebar
        setDifficulty={setDifficulty}
        setSortBy={setSortBy}
        setGamesTypes={setGamesTypes}
        gamesTypes={gamesTypes}
      />
      <div className={classes.playlists}>
        {isComingSoon ? (
          <p className={classes.noData}>
            Coming Soon!
          </p>
        ) : filteredPlaylists.length > 0 ? (
          filteredPlaylists.map((playlist) => {
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
          })
        ) : (
          <p className={classes.noData}>
            We found no playlist that matches your criteria!
          </p>
        )}
      </div>
    </motion.div>
  );
}
