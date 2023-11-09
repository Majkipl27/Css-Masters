import { useEffect, useState } from "react";
import classes from "./Leaderboards.module.css";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { userAtom } from "../../Atoms";
import Loader from "../../Components/Loader";
import AvatarComponent from "../../Components/AvatarComponent";
import { Link } from "react-router-dom";

interface mostPoints {
  userId: number;
  username: string;
  score: number;
}

interface mostChallenges {
  userId: number;
  username: string;
  totalChallengesCompleted: number;
}

interface userPlaces {
  userScorePlace: number;
  userScore: number;
  userChallangesPlace: number;
  userChallangesCompleted: number;
}

export default function Leaderboards() {
  const [mostPoints, setMostPoints] = useState<mostPoints[]>();
  const [mostChallenges, setMostChallenges] = useState<mostChallenges[]>();
  const [userPlaces, setUserPlaces] = useState<userPlaces>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const user = useAtomValue(userAtom);

  const fetchUserPlace = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/leaderboards/userplace`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      setUserPlaces(data);
    }
  };

  const fetchLeaderboards = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/leaderboards/top`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      setMostPoints(data.topScores);
      setMostChallenges(data.topChallangesCount);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      if (user.id) {
        await fetchUserPlace();
      }
      await fetchLeaderboards();
      setIsFetching(false);
    }

    fetchData();
  }, []);

  return (
    <motion.div
      className={classes.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <h1>Leaderboards</h1>
      {isFetching ? (
        <Loader />
      ) : (
        <div className={classes.leaderboards}>
          <div className={classes.leaderboard}>
            <p>Most points</p>
            <div className={classes.leaderboardsItems}>
              {mostPoints?.map((user, index) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, bottom: -10 }}
                    animate={{
                      opacity: 1,
                      bottom: 0,
                      transition: { duration: 0.25, delay: index * 0.1 },
                    }}
                    className={`${classes.leaderboardItem} ${
                      user.userId === user.userId ? classes.user : ""
                    }`}
                    key={index}
                  >
                    <Link to={`/profile/${user.userId}`} className={classes.leaderboardItemPlace}>
                      <p>{index + 1}</p>
                      <AvatarComponent
                        userId={user.userId}
                        userNameForAvatar={user.username}
                        size="small"
                      />
                      <p>{user.username}</p>
                    </Link>
                    <p>{user.score}</p>
                  </motion.div>
                );
              })}

              <div className={classes.line} />
              {userPlaces && (
                <div
                  className={`${classes.leaderboardItem} ${
                    user.userId === user.userId ? classes.user : ""
                  }`}
                >
                  <Link to={`/profile/${user.userId}`} className={classes.leaderboardItemPlace}>
                    <p>{userPlaces.userScorePlace}</p>
                    <AvatarComponent
                      userId={user.id}
                      userNameForAvatar={user.username}
                      size="small"
                    />
                    <p>{user.username}</p>
                  </Link>
                  <p>{userPlaces.userScore}</p>
                </div>
              )}
            </div>
          </div>
          <div className={classes.lineVertical}/>
          <div className={classes.leaderboard}>
            <p>Most Challanges Completed</p>
            <div className={classes.leaderboardsItems}>
              {mostChallenges?.map((user, index) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, bottom: -10 }}
                    animate={{
                      opacity: 1,
                      bottom: 0,
                      transition: { duration: 0.25, delay: index * 0.1 },
                    }}
                    className={`${classes.leaderboardItem} ${
                      user.userId === user.userId ? classes.user : ""
                    }`}
                    key={index}
                  >
                    <Link to={`/profile/${user.userId}`} className={classes.leaderboardItemPlace}>
                      <p>{index + 1}</p>
                      <AvatarComponent
                        userId={user.userId}
                        userNameForAvatar={user.username}
                        size="small"
                      />
                      <p>{user.username}</p>
                    </Link>
                    <p>{user.totalChallengesCompleted}</p>
                  </motion.div>
                );
              })}
              <div className={classes.line} />
              {userPlaces && (
                <div
                  className={`${classes.leaderboardItem} ${
                    user.userId === user.userId ? classes.user : ""
                  }`}
                >
                  <Link to={`/profile/${user.userId}`} className={classes.leaderboardItemPlace}>
                    <p>{userPlaces.userChallangesPlace}</p>
                    <AvatarComponent
                      userId={user.id}
                      userNameForAvatar={user.username}
                      size="small"
                    />
                    <p>{user.username}</p>
                  </Link>
                  <p>{userPlaces.userChallangesCompleted}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
