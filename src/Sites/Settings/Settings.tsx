import classes from "./Settings.module.css";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useAtomValue } from "jotai";
import { userAtom } from "../../Atoms";
import { useEffect, useState } from "react";
import Avatar from "../../Components/Avatar";
import { useNavigate } from "react-router-dom";

interface userData {
  id: number;
  joinedAt: Date;
  email: string;
  username: string;
  isVerified: boolean;
  isBanned: boolean;
  avatar: Blob;
  banner: Blob;
  instagram?: string;
  website?: string;
  github?: string;
  x?: string;
  description?: string;
  name?: string;
  lastname?: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const { id } = user;
  if (!id) navigate("login");
  const [userData, setUserData] = useState<userData>();
  const [bannerUrl, setBannerUrl] = useState<string>("");

  useEffect(() => {
    async function getPublicInfo() {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.statusCode >= 400) {
              navigate("/404");
            } else {
              setUserData(data);
            }
          });
      } catch (error) {
        console.error(error);
      }
    }

    const getBannerUrl = async (): Promise<void> => {
      fetch(`${process.env.REACT_APP_API_URL}/user/settings/banner/${id}`, {
        credentials: "include",
        method: "GET",
      })
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

  return (
    <div className={classes.main}>
      <h2>Settings</h2>
      <form className={classes.flex}>
        <div className={classes.left}>
          <Input placeholder="Username" value={userData?.username} />
          <Input placeholder="Name" value={userData?.name} />
          <Input placeholder="Lastname" value={userData?.lastname} />
          <Input placeholder="E-Mail" type="email" value={userData?.email} />
          <textarea placeholder="Description" defaultValue={userData?.description} title="Description" />
          <Button type="alt">Change Password</Button>
          <Button type="alt">Delete Account</Button>
        </div>
        <div className={classes.right}>
          <div
            className={classes.avatarSection}
            style={
              bannerUrl
                ? {
                    background: `linear-gradient(92deg, rgba(66, 66, 66, 0.60) 0%, rgba(66, 66, 66, 0.60) 100%), url('${bannerUrl}') no-repeat center center`,
                  }
                : {}
            }
          >
            <Avatar userId={+(id || -1)} className={classes.avatar} />
          </div>
          <div className={classes.imagesInputs}>
            <label className={classes.inputFile}>
              Upload Avatar
              <input type="file" />
            </label>
            <label className={classes.inputFile}>
              Upload Banner
              <input type="file" />
            </label>
          </div>
          <div className={classes.line} />
          <h3>Socials</h3>
          <Input placeholder="Website" value={userData?.website}/>
          <Input placeholder="Github Username" value={userData?.github}/>
          <Input placeholder="Instagram Username" value={userData?.instagram}/>
          <Input placeholder="X Username" value={userData?.x}/>
          <Button type="default">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}
