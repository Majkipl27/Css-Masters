import classes from "./Settings.module.css";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useAtomValue } from "jotai";
import { userAtom } from "../../Atoms";
import { useEffect, useState, useRef } from "react";
import AvatarComponent from "../../Components/AvatarComponent";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AvatarEditor from "react-avatar-editor";
import {
  ArrowClockwise,
  ArrowCounterclockwise,
  X,
} from "react-bootstrap-icons";
import { motion } from "framer-motion";
import Loader from "../../Components/Loader";

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

interface avatarOptions {
  scale: number;
  rotate: number;
}

export default function Settings() {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const { id } = user;
  const [userData, setUserData] = useState<userData>();
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarBlob, setAvatarBlob] = useState<Blob>();
  const [isUserEditingAvatar, setIsUserEditingAvatar] =
    useState<boolean>(false);
  const [avatarEditingOptions, setAvatarEditingOptions] =
    useState<avatarOptions>();
  const [hasUserUploadedBanner, setHasUserUploadedBanner] =
    useState<boolean>(false);

  const newAvatarRef = useRef<any>(null);
  const bannerInputRef = useRef<any>(null);

  useEffect(() => {
    if (!(id + 1)) {
      navigate("/login");
      return;
    }
    async function getPublicInfo() {
      try {
        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.statusCode >= 400) {
              toast.error("Failed to load user data!");
              navigate(`/profile/${id}`);
            } else {
              setUserData(data);
            }
          });
      } catch (error) {
        toast.error("Failed to load user data!");
        navigate(`/profile/${id}`);
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

  const bannerStyle = {
    background: `linear-gradient(92deg, rgba(66, 66, 66, 0.60) 0%, rgba(66, 66, 66, 0.60) 100%), url('${bannerUrl}') no-repeat center center`,
  };

  let userNameForAvatarGenerating = "";
  if (userData?.name && userData?.lastname) {
    userNameForAvatarGenerating = `${userData?.name} ${userData?.lastname[0]}`;
  } else {
    userNameForAvatarGenerating = userData?.username || "";
  }

  function uploadBanner(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only .png and .jpeg files are allowed!");
      return;
    }
    setBannerUrl(URL.createObjectURL(file));
    setHasUserUploadedBanner(true);
  }

  function uploadAvatar(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only .png and .jpeg files are allowed!");
      return;
    }
    setAvatarUrl(URL.createObjectURL(file));
    setIsUserEditingAvatar(true);
  }

  function closeModal() {
    setIsUserEditingAvatar(false);
    setAvatarUrl("");
    setAvatarEditingOptions(undefined);
  }

  function setRotate(direction: string) {
    if (direction === "left")
      setAvatarEditingOptions({
        scale: avatarEditingOptions?.scale || 1,
        rotate: (avatarEditingOptions?.rotate || 0) - 90,
      });
    else
      setAvatarEditingOptions({
        scale: avatarEditingOptions?.scale || 1,
        rotate: (avatarEditingOptions?.rotate || 0) + 90,
      });
  }

  function setScale(e: any) {
    setAvatarEditingOptions({
      scale: e.target.value,
      rotate: avatarEditingOptions?.rotate || 0,
    });
  }

  function saveAvatarImage() {
    if (!newAvatarRef.current) return;
    const canvas = newAvatarRef.current.getImage();
    canvas.toBlob((blob: Blob) => {
      if (!blob) return;
      setAvatarUrl(URL.createObjectURL(blob));
      setAvatarBlob(blob);
      setIsUserEditingAvatar(false);
    });
    setAvatarEditingOptions(undefined);
    setIsUserEditingAvatar(false);
  }

  const avatarEditorModal = (
    <div className={classes.backdrop}>
      <div className={classes.avatarEditorModal}>
        <X onClick={closeModal} />
        <AvatarEditor
          image={avatarUrl}
          width={14 * 16}
          height={14 * 16}
          borderRadius={150}
          color={[173, 181, 189, 0.6]}
          scale={avatarEditingOptions?.scale || 1}
          rotate={avatarEditingOptions?.rotate || 0}
          ref={newAvatarRef}
        />
        <div className={classes.avatarEditorRotateControls}>
          <Button
            type="alt"
            onClick={() => {
              setRotate("left");
            }}
          >
            <ArrowCounterclockwise />
          </Button>
          <Button
            type="alt"
            onClick={() => {
              setRotate("right");
            }}
          >
            <ArrowClockwise />
          </Button>
        </div>
        <input
          type="range"
          min={1}
          max={3}
          onChange={setScale}
          step={0.01}
          defaultValue={1}
        />
        <Button type="default" onClick={saveAvatarImage}>
          Save
        </Button>
      </div>
    </div>
  );

  function submitHandler(e: any) {
    e.preventDefault();

    //ik this looks terrible but it works
    //idk why i needed to do this in such a weird way
    //if i just used formData.entries() it would return empty values
    //so i had to do this

    const formData = new FormData(e.target);

    if (hasUserUploadedBanner) {
      formData.append("banner", bannerInputRef.current?.files[0]);
    }

    if (avatarBlob) {
      formData.append("avatar", avatarBlob);
    }

    let values = Object.fromEntries(formData.entries());

    let newObject = {} as any;

    for (const [key, value] of Object.entries(values)) {
      if (value) {
        newObject = { ...newObject, [key]: value };
      }
    }

    const correctFormdata = new FormData();

    for (const key in newObject) {
      correctFormdata.append(key, newObject[key]);
    }

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/settings/`, {
      method: "PATCH",
      body: correctFormdata,
      credentials: "include",
    })
      .then((response) => {
        if (response.ok)
          toast.success(
            "Settings saved! (avatar change in header may not apprear instantly)"
          );
      })
      .catch((error) => {
        toast.error("Failed to save settings!");
        console.log("error", error);
      });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={classes.main}
    >
      {isUserEditingAvatar && avatarEditorModal}
      <h2>Settings</h2>
      {userData ? (
        <motion.form
          className={classes.flex}
          onSubmit={submitHandler}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className={classes.left}>
            <Input
              placeholder="Username"
              value={userData?.username}
              name="username"
            />
            <Input placeholder="Name" value={userData?.name} name="name" />
            <Input
              placeholder="Lastname"
              value={userData?.lastname}
              name="lastname"
            />
            <Input
              placeholder="E-Mail"
              type="email"
              value={userData?.email}
              readonly
              name="email"
            />
            <textarea
              placeholder="Description"
              defaultValue={userData?.description}
              title="Description"
              maxLength={600}
              name="description"
            />
            <Button type="alt">Change Password</Button>
            <Button type="alt">Delete Account</Button>
          </div>
          <div className={classes.right}>
            <div
              className={classes.avatarSection}
              style={bannerUrl ? bannerStyle : {}}
            >
              {!isUserEditingAvatar && avatarUrl ? (
                <img src={avatarUrl} alt="Img" />
              ) : (
                <AvatarComponent
                  userId={+id}
                  className={classes.avatar}
                  userNameForAvatar={userNameForAvatarGenerating}
                  size="medium"
                />
              )}
            </div>
            <div className={classes.imagesInputs}>
              <label className={classes.inputFile}>
                Upload Avatar
                <input
                  type="file"
                  onChange={uploadAvatar}
                  name="avatar"
                  defaultValue={avatarUrl}
                />
              </label>
              <label className={classes.inputFile}>
                Upload Banner
                <input
                  type="file"
                  onChange={uploadBanner}
                  name="banner"
                  ref={bannerInputRef}
                />
              </label>
            </div>
            <div className={classes.line} />
            <h3>Socials</h3>
            <Input
              placeholder="Website"
              value={userData?.website}
              name="website"
            />
            <Input
              placeholder="Github Username"
              value={userData?.github}
              name="github"
            />
            <Input
              placeholder="Instagram Username"
              value={userData?.instagram}
              name="instagram"
            />
            <Input placeholder="X Username" value={userData?.x} name="x" />
            <Button type="default" submit>
              Save Settings
            </Button>
          </div>
        </motion.form>
      ) : (
        <Loader addClassName={classes.loader} />
      )}
    </motion.div>
  );
}
