import classes from "./Playlist.module.css";
import tagClasses from "./Tags.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, PlayFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import formatDate from "../../../lib/formatDate";
import getUserObject from "../../../lib/getUser";

interface playlist {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  description: string;
  additionalComment?: string;
  publishDate: Date;
  author: string;
  challenges: challenge[];
}

interface challenge {
  id: number;
  name: string;
  challangeImageUrl: string;
  challengeInPlaylistId: number;
}

export default function Playlist({
  id,
  name,
  image,
  difficulty,
  description,
  additionalComment,
  publishDate,
  author,
  challenges,
}: playlist) {
  const [isUserChoosing, setIsUserChoosing] = useState<boolean>(false);

  return (
    <>
      <h3 className={classes.addComment}>{additionalComment || ""}</h3>
      <AnimatePresence mode="wait">
        {!isUserChoosing ? (
          <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.25 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className={classes.playlist}
          >
            <img
              src={image}
              alt={`${name}'s image`}
              className={classes.image}
            />
            <div className={classes.hero}>
              <h3>
                <Link to={`/playlist/${id}`}>{name}</Link>
              </h3>
              <div className={classes.lineHorizontal} />
              <div className={classes.addData}>
                <span>{author}</span>
                <div className={classes.line} />
                <span
                  className={`${tagClasses[difficulty.toLowerCase()]} ${
                    tagClasses.difficulty
                  }`}
                >
                  {difficulty.replace("_", " ")}
                </span>
                <div className={classes.line} />
                <span>{formatDate(publishDate)}</span>
              </div>
              <p className={classes.description}>{description}</p>
              <div
                className={classes.play}
                onClick={() => {
                  setIsUserChoosing(true);
                }}
              >
                PLAY <PlayFill />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={id + 2}
            className={classes.playlistVertical}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.25 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <span>
              <ArrowLeft
                className={classes.arrowBack}
                onClick={() => {
                  setIsUserChoosing(false);
                }}
              />
              <p>Choose the challenge!</p>
            </span>
            <div className={classes.challenges}>
              {challenges ? (
                challenges.map((challenge) => {
                  let linkToPlay = `/play/${id}/${challenge.challengeInPlaylistId}`;
                  if (!(getUserObject().id + 1)) {
                    linkToPlay = "/login";
                  }
                  return (
                    <Link to={linkToPlay} key={challenge.id}>
                      <img
                        src={challenge.challangeImageUrl}
                        key={challenge.id}
                        alt={`${challenge.name}'s image`}
                        title={challenge.name}
                        className={classes.imageSmall}
                      />
                    </Link>
                  );
                })
              ) : (
                <p>We're sorry! No challenges found!</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
