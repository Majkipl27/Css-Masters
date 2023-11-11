import { useEffect, useState } from "react";
import Loader from "../../Components/Loader";
import { motion } from "framer-motion";
import classes from "./Badges.module.css";
import formatDate from "../../lib/formatDate";
import Badge from "./Badge";

interface Badge {
  id: number;
  createdAt: Date;
  name: string;
  description: string;
  imageId: number;
}

export default function Badges() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchBadges() {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/badges`,
        {
          credentials: "include",
          method: "GET",
        }
      );

      const badges = await res.json();
      setBadges(badges);
    }
    fetchBadges();
    setIsFetching(false);
  }, []);

  return (
    <motion.div
      className={classes.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <h1>Badges</h1>
      {isFetching ? (
        <Loader />
      ) : (
        badges.map((badge, i: number) => (
          <motion.div
            initial={{ opacity: 0, bottom: -5 }}
            animate={{
              opacity: 1,
              bottom: 0,
              transition: { duration: 0.5, delay: i * 0.2 },
            }}
            exit={{ opacity: 0 }}
            className={classes.badge}
            key={badge.id}
          >
            <Badge
              badgeId={badge.imageId}
              size={"150px"}
              key={badge.id}
              badgeName={badge.name}
              description={badge.description}
            />
            <div className={classes.badgeHero}>
              <p>{badge.name}</p>
              <p>Added: {formatDate(badge.createdAt, false)}</p>
              <p>{badge.description}</p>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
