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
  if (!id) navigate("login");
  const [userData, setUserData] = useState<userData>();
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [newAvatarUrl, setNewAvatarUrl] = useState<string>("");
  const [isUserEditingAvatar, setIsUserEditingAvatar] =
    useState<boolean>(false);
  const [avatarEditingOptions, setAvatarEditingOptions] =
    useState<avatarOptions>();
  const [hasUserUploadedBanner, setHasUserUploadedBanner] =
    useState<boolean>(false);

  const newAvatarRef = useRef<any>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

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

  const bannerStyle = {
    background: `linear-gradient(92deg, rgba(66, 66, 66, 0.60) 0%, rgba(66, 66, 66, 0.60) 100%), url('${bannerUrl}') no-repeat center center`,
    backgroundSize: "contain",
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
    setNewAvatarUrl(URL.createObjectURL(file));
    setIsUserEditingAvatar(true);
  }

  function closeModal() {
    setIsUserEditingAvatar(false);
    setNewAvatarUrl("");
    setAvatarEditingOptions(undefined);
    if (avatarInputRef.current) avatarInputRef.current.value = '';
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
      setNewAvatarUrl(URL.createObjectURL(blob));
      setIsUserEditingAvatar(false);
    });
    setAvatarEditingOptions(undefined);
    setIsUserEditingAvatar(false);
    if (avatarInputRef.current) avatarInputRef.current.value = "";
  }

  const avatarEditorModal = (
    <div className={classes.backdrop}>
      <div className={classes.avatarEditorModal}>
        <Button type="alt" onClick={closeModal}>
          Cancel
        </Button>
        <AvatarEditor
          image={newAvatarUrl}
          width={14 * 16}
          height={14 * 16}
          borderRadius={150}
          color={[173, 181, 189, 0.6]}
          scale={avatarEditingOptions?.scale || 1}
          rotate={avatarEditingOptions?.rotate || 0}
          ref={newAvatarRef}
        />
        <Button
          type="alt"
          onClick={() => {
            setRotate("left");
          }}
        >
          Rotate Left
        </Button>
        <Button
          type="alt"
          onClick={() => {
            setRotate("right");
          }}
        >
          Rotate Right
        </Button>
        <input
          type="range"
          min={1}
          max={2}
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

  return (
    <div className={classes.main}>
      {isUserEditingAvatar && avatarEditorModal}
      <h2>Settings</h2>
      <form className={classes.flex}>
        <div className={classes.left}>
          <Input placeholder="Username" value={userData?.username} />
          <Input placeholder="Name" value={userData?.name} />
          <Input placeholder="Lastname" value={userData?.lastname} />
          <Input placeholder="E-Mail" type="email" value={userData?.email} />
          <textarea
            placeholder="Description"
            defaultValue={userData?.description}
            title="Description"
            maxLength={600}
          />
          <Button type="alt">Change Password</Button>
          <Button type="alt">Delete Account</Button>
        </div>
        <div className={classes.right}>
          <div
            className={classes.avatarSection}
            style={bannerUrl ? bannerStyle : {}}
          >
            {!isUserEditingAvatar && newAvatarUrl ? (
              <img src={newAvatarUrl} alt="Img" />
            ) : (
              <AvatarComponent
                userId={+(id || -1)}
                className={classes.avatar}
                userNameForAvatar={userNameForAvatarGenerating}
                size="medium"
              />
            )}
          </div>
          <div className={classes.imagesInputs}>
            <label className={classes.inputFile}>
              Upload Avatar
              <input type="file" onChange={uploadAvatar} ref={avatarInputRef} />
            </label>
            <label className={classes.inputFile}>
              Upload Banner
              <input type="file" onChange={uploadBanner} />
            </label>
          </div>
          <div className={classes.line} />
          <h3>Socials</h3>
          <Input placeholder="Website" value={userData?.website} />
          <Input placeholder="Github Username" value={userData?.github} />
          <Input placeholder="Instagram Username" value={userData?.instagram} />
          <Input placeholder="X Username" value={userData?.x} />
          <Button type="default">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}
