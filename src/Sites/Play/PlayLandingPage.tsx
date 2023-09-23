import PlaySidebar from "./Components/PlaySidebar";
import { motion } from "framer-motion";
import classes from "./PlayLandingPage.module.css";
import { useState } from "react";
import playlists from "./Playlists";
import Playlist from "./Components/Playlist";

export default function PlayLandingPage() {
  const [difficulty, setDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={classes.main}
    >
      <PlaySidebar setDifficulty={setDifficulty} setSortBy={setSortBy} />
      <div className={classes.playlists}>
        {playlists.map((playlist) => {
          return (
            <div
              key={playlist.id}
              className={classes.uselessWrapperThatIsNeededBecauseOfKey}
            >
              <Playlist
                name={playlist.name}
                image={playlist.image}
                difficulty={playlist.difficulty}
                description={playlist.description}
                additionalComment={playlist.additionalComment}
                publishDate={playlist.publishDate}
                author={playlist.author}
                challenges={playlist.challenges}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
