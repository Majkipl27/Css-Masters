import { Link, useParams } from "react-router-dom";
import classes from "./Profile.module.css";
import {
  Link45deg,
  Github,
  Instagram,
  Twitter,
  GearFill,
} from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarComponent from "../../Components/AvatarComponent";
import { useAtomValue } from "jotai";
import { userAtom } from "../../Atoms";
import { motion } from "framer-motion";
import Loader from "../../Components/Loader";
import formatDate from "../../lib/formatDate";
import tagClasses from "../Play/Layout/Tags.module.css";
import Badge from "../Badges/Badge";

interface userData {
  id: number;
  joinedAt: Date;
  lastSeen: Date;
  email: string;
  username: string;
  isVerified: boolean;
  isBanned: boolean;
  instagram?: string;
  website?: string;
  github?: string;
  x?: string;
  description?: string;
  name?: string;
  lastname?: string;
  userScore: number;
  userChallangesCompleted: number;
  favouriteTags: {
    [key: string]: number;
  };
  userBadges: badge[];
}

interface badge {
  createdAt: Date;
  name: string;
  description: string;
  imageId: number;
}

export default function Profile() {
  const id = useParams<{ id: string }>().id;
  const [userData, setUserData] = useState<userData>();
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [vievportWidth, setVievportWidth] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const fetchingLoader = (
    <div className={classes.fetchingLoader}>
      <Loader />
    </div>
  );

  useEffect(() => {
    setVievportWidth(window.innerWidth);
    setIsFetching(true);

    window.addEventListener("resize", () => {
      setVievportWidth(window.innerWidth);
    });

    function getPublicInfo() {
      try {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/${+(id || 0)}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.statusCode >= 400) {
              navigate("/");
            } else {
              setUserData(data);
              setIsFetching(false);
            }
          });
      } catch (error) {
        console.error(error);
      }
    }

    const getBannerUrl = async (): Promise<void> => {
      fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/settings/banner/${id}`,
        {
          credentials: "include",
          method: "GET",
        }
      )
        .then((res: Response) => {
          if (!res.ok || res.status === 204) throw new Error();
          return res.blob();
        })
        .then((blob) => setBannerUrl(URL.createObjectURL(blob)))
        .catch(() => setBannerUrl(""));
    };

    getPublicInfo();
    getBannerUrl();
  }, [id, navigate]);

  let userNamingInfo = "";
  if (userData?.name || userData?.lastname) {
    userNamingInfo = `| ${userData?.name || ""} ${userData?.lastname || ""}`;
  }

  return (
    <motion.div
      className={classes.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {isFetching && fetchingLoader}
      <div
        className={classes.avatarSection}
        style={{
          background:
            bannerUrl &&
            `linear-gradient(92deg, rgba(66, 66, 66, 0.60) 0%, rgba(66, 66, 66, 0.60) 100%), url('${bannerUrl}') no-repeat center center`,
        }}
      >
        <AvatarComponent
          userId={+(id || -1)}
          className={classes.avatar}
          userNameForAvatar={userData?.username || ""}
          size={vievportWidth > 1400 ? "big" : "medium"}
        />
        <h2>
          {userData?.username} {userNamingInfo}
        </h2>
        <p>Followers: [21] | Following: [37]</p>
        {user.id === +(id || 0) && (
          <Link to={`/profile/settings`} className={classes.cog}>
            <GearFill />
          </Link>
        )}
      </div>
      <div className={classes.mainRow}>
        <div className={classes.left}>
          <div>
            <p>About {userData?.username}</p>
            <p>
              {userData?.description || "This user has no description yet."}
            </p>
          </div>
          {(userData?.instagram ||
            userData?.github ||
            userData?.website ||
            userData?.x) && (
            <div className={classes.socials}>
              <div className={classes.lineHorizontal} />
              {userData?.website && (
                <div className={classes.social}>
                  <Link45deg />
                  <a href={`http://${userData.website}`} target="_blank">
                    {userData.website}
                  </a>
                </div>
              )}
              {userData?.github && (
                <div className={classes.social}>
                  <Github />
                  <a
                    href={`https://github.com/${userData.github}`}
                    target="_blank"
                  >
                    {userData.github}
                  </a>
                </div>
              )}
              {userData?.instagram && (
                <div className={classes.social}>
                  <Instagram />
                  <a
                    href={`https://www.instagram.com/${userData.instagram}`}
                    target="_blank"
                  >
                    {userData.instagram}
                  </a>
                </div>
              )}
              {userData?.x && (
                <div className={classes.social}>
                  <Twitter />
                  <a href={`https://www.x.com/${userData.x}`} target="_blank">
                    {userData.x}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={classes.line} />
        <div className={classes.right}>
          <div className={classes.badgesSection}>
            <Link to="/badges">Badges</Link>
            <div className={classes.badges}>
              {userData?.userBadges ? (
                userData?.userBadges.map((badge) => (
                  <Badge
                    key={badge.imageId}
                    badgeId={badge.imageId}
                    size="48px"
                    badgeName={badge.name}
                    description={badge.description}
                    gotAt={badge.createdAt}
                  />
                ))
              ) : (
                <p>This user has no badges yet.</p>
              )}
            </div>
          </div>
          <div className={classes.statisticsSection}>
            <div className={classes.statistic}>
              <p>Overall Points</p>
              <p>{userData?.userScore}</p>
            </div>
            <div className={classes.statistic}>
              <p>Challenges done</p>
              <p>{userData?.userChallangesCompleted}</p>
            </div>
          </div>
          <div className={classes.tagsSection}>
            <p>Favourite tags</p>
            <div className={classes.tags}>
              {userData?.favouriteTags ? (
                Object.keys(userData?.favouriteTags).map((tag) => (
                  <span
                    key={tag}
                    className={`${tagClasses[tag.toLowerCase()]} ${
                      tagClasses.difficulty
                    }`}
                  >
                    {tag.replace("_", " ")}
                  </span>
                ))
              ) : (
                <p>This user has no favourite tags yet.</p>
              )}
            </div>
          </div>
          <p className={classes.lastActive}>
            Last Active:{" "}
            {userData?.lastSeen && formatDate(userData.lastSeen, true)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
