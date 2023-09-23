import { useState } from "react";
import classes from "./PlaySidebar.module.css";

interface gameType {
  id: number;
  name: string;
  isActive: boolean;
}

export default function PlaySidebar(props: {setDifficulty: any, setSortBy: any}) {
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
      <p
        className={classes.switch}
        onClick={() => {
          setIsShown(!isShown);
        }}
        style={{ left: isShown ? "15%" : "0" }}
      >
        Hide/Show
      </p>
      <div
        className={classes.main}
        style={{
          transform: isShown ? "translateX(0%)" : "translateX(-100%)",
          transformOrigin: "left",
          width: isShown ? "15%" : "0",
        }}
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
                props.setDifficulty(e.target.value);
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
                props.setSortBy(e.target.value as "newest" | "oldest");
              }}
            >
              <option value="newest">From newest</option>
              <option value="oldest">From oldest</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
