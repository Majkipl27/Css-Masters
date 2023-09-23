import classes from "./Playlist.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, PlayFill } from "react-bootstrap-icons";

interface playlist {
  name: string;
  image: string;
  difficulty: string;
  description: string;
  additionalComment?: string;
  publishDate: string;
  author: string;
  challenges: challenge[];
}

interface challenge {
  id: string;
  name: string;
  image: string;
}

export default function Playlist({
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
      {!isUserChoosing && (
        <AnimatePresence>
          <motion.div
            key={Math.random()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.75 } }}
            exit={{ opacity: 0, transition: { duration: 0.75 } }}
            className={classes.playlist}
          >
            <img
              src={image}
              alt={`${name}'s image`}
              className={classes.image}
            />
            <div className={classes.hero}>
              <h3>{name}</h3>
              <div className={classes.lineHorizontal} />
              <div className={classes.addData}>
                <span>{author}</span>
                <div className={classes.line} />
                <span
                  className={`${classes.difficulty} ${
                    difficulty === "Rookie" && classes.rookie
                  }`}
                >
                  {difficulty}
                </span>
                <div className={classes.line} />
                <span>{publishDate}</span>
              </div>
              <p className={classes.description}>{description}</p>
            </div>
            <div
              className={classes.play}
              onClick={() => {
                setIsUserChoosing(true);
              }}
            >
              <PlayFill />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {isUserChoosing && (
        <AnimatePresence>
          <motion.div
            key={Math.random()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.75 } }}
            exit={{ opacity: 0, transition: { duration: 0.75 } }}
            className={classes.playlistVertical}
          >
            <ArrowLeft
              className={classes.arrowBack}
              onClick={() => {
                setIsUserChoosing(false);
              }}
            />
            <div className={classes.challenges}>
              {challenges.map((challenge) => {
                return (
                  <img
                    src={challenge.image}
                    key={challenge.id}
                    alt={`${challenge.name}'s image`}
                    title={challenge.name}
                    className={classes.imageSmall}
                  />
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
