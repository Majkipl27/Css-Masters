import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../Components/Button";
import { motion } from "framer-motion";
import classes from "./PlaylistLandingPage.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import formatDate from "../../../lib/formatDate";
import Loader from "../../../Components/Loader";

interface Playlist {
  id: number;
  name: string;
  image: string;
  additionalComment: string;
  difficulty: string;
  description: string;
  author: string;
  updatedAt: Date;
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
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    setIsFetching(true);
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/play/playlists/${
        params.playlistId
      }`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    try {
      const data = await response.json();
      setPlaylist(data);
      setIsFetching(false);
    } catch (e) {
      navigate("/play");
    }
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
      {isFetching && <Loader />}
      {!isFetching &&
        (playlist ? (
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
                  <Link
                    to={`/play/${playlist.id}/${challenge.challengeInPlaylistId}`}
                    className={classes.challenge}
                    key={challenge.id}
                  >
                    <img
                      src={challenge.challangeImageUrl}
                      alt={`${challenge.name}'s image`}
                      className={classes.image}
                    />

                    {challenge.name}
                  </Link>
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
        ))}
    </motion.div>
  );
}
