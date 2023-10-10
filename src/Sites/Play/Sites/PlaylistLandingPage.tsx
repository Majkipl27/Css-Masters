import { Link, useParams } from "react-router-dom";
import Button from "../../../Components/Button";
import { motion } from "framer-motion";
import classes from "./PlaylistLandingPage.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import formatDate from "../../../lib/formatDate";

interface Playlist {
  id: number;
  name: string;
  image: string;
  additionalComment: string;
  difficulty: string;
  description: string;
  author: string;
  updatedAt: string;
  Challenges: Challenge[];
}

interface Challenge {
  id: number;
  name: string;
  challangeImageUrl: string;
  challengeInPlaylistId: number;
}

export default function PlaylistLandingPage() {
  const params = useParams<{ playlistId: string }>();
  const [playlist, setPlaylist] = useState<Playlist>();

  const fetchPlaylists = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/play/playlists/${params.playlistId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setPlaylist(data);
  };

  useEffect(() => {
    if (params.playlistId !== undefined) fetchPlaylists();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={classes.main}
    >
      {playlist ? (
        <div className={classes.playlist}>
          <Link to="/play">
            <ArrowLeft />
            Back to all games
          </Link>
          <h3 className={classes.addComment}>
            {playlist.additionalComment || ""}
          </h3>
          <div className={classes.playlistHero}>
            <img
              src={playlist.image}
              alt={`${playlist.name}'s image`}
              className={classes.image}
            />
            <div className={classes.hero}>
              <h3>{playlist.name}</h3>
              <div className={classes.lineHorizontal} />
              <div className={classes.addData}>
                <span>{playlist.author}</span>
                <div className={classes.line} />
                <span
                  className={`${classes[playlist.difficulty.toLowerCase()]} ${
                    classes.difficulty
                  }`}
                >
                  {playlist.difficulty.replace("_", " ")}
                </span>
                <div className={classes.line} />
                <span>{formatDate(playlist.updatedAt)}</span>
              </div>
              <p className={classes.description}>{playlist.description}</p>
            </div>
          </div>
          <div className={classes.challenges}>
            {playlist.Challenges.map((challenge) => {
              return (
                <div className={classes.challenge} key={challenge.id}>
                  <img
                    src={challenge.challangeImageUrl}
                    alt={`${challenge.name}'s image`}
                    className={classes.image}
                  />
                  <Link
                    to={`/play/${playlist.id}/${challenge.challengeInPlaylistId}`}
                  >
                    {challenge.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <h2>We couldn't find playlist with given id!</h2>
          <Button isLink={true} to="/play" type="default">
            Back to all games
          </Button>
        </>
      )}
    </motion.div>
  );
}
