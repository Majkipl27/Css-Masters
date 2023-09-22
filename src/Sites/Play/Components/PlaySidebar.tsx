import { useState } from "react";
import classes from "./PlaySidebar.module.css";
import { motion } from "framer-motion";

interface gameType {
  id: number;
  name: string;
  isActive: boolean;
}

export default function PlaySidebar() {
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

  const [difficulty, setDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<"newest" | "oldest">('newest');
  const [isShown, setIsShown] = useState<boolean>(true);

  const setActive = (id: number) => {
    setGamesTypes(
      gamesTypes.map((gameType) => {
        if (gameType.id === id) {
          gameType.isActive = true;
        } else {
          gameType.isActive = false;
        }
        return gameType;
      })
    );
  };

  return (
    <>
      <motion.p
        className={classes.switch}
        onClick={() => {
          setIsShown(!isShown);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        style={
          isShown
            ? {
                left: "15%",
                transition: "all 150ms linear",
              }
            : {
                left: "0",
                transition: "all 150ms linear",
              }
        }
      >
        Hide/Show
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className={classes.main}
        style={
          isShown
            ? {
                transform: "scaleX(1)",
                transformOrigin: "left",
                transition: "all 150ms linear",
              }
            : {
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "all 150ms linear",
              }
        }
      >
        <div className={classes.gamesTypes}>
          {gamesTypes.map((gameType) => {
            return (
              <div
                key={gameType.id}
                onClick={() => setActive(gameType.id)}
                className={`${classes.gameType} ${
                  gameType.isActive ? classes.gameTypeActive : ""
                }`}
              >
                {gameType.name}
              </div>
            );
          })}
        </div>
        <div className={classes.line} />
        <div>
          <label className={classes.selectLabel}>Difficulty</label>
          <div className={classes.customSelect}>
            <select
              onChange={(e) => {
                setDifficulty(e.target.value);
              }}
            >
              <option value="All">All</option>
              <option value="Rookie">Rookie</option>
              <option value="Intermidiate">Intermidiate</option>
              <option value="Hard">Hard</option>
              <option value="CSS-MASTER">CSS-MASTER</option>
            </select>
          </div>
        </div>
        <div>
          <label className={classes.selectLabel}>Sort by release date</label>
          <div className={classes.customSelect}>
            <select
              onChange={(e) => {
                setSortBy(e.target.value as "newest" | "oldest");
              }}
            >
              <option value="newest">From newest</option>
              <option value="oldest">From oldest</option>
            </select>
          </div>
        </div>
      </motion.div>
    </>
  );
}
