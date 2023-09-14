import { useState, useCallback, useEffect } from "react";
import defaultAvatar from "../Graphics/default_avatar.svg";
import { ColorRing } from "react-loader-spinner";

const Avatar = (props: {
  userId: number;
  className?: any;
  override?: string;
}) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const AvatarSpinner = () => (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  );

  const getAvatarUrl = useCallback(async (): Promise<void> => {
    fetch(
      `${process.env.REACT_APP_API_URL}/user/settings/avatar/${props.userId}`,
      {
        credentials: "include",
        method: "GET",
      }
    )
      .then((res: Response) => {
        if (!res.ok || res.status === 204) throw new Error();
        return res.blob();
      })
      .then((blob) => setAvatarUrl(URL.createObjectURL(blob)))
      .catch(() => setAvatarUrl(defaultAvatar))
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.userId]);

  useEffect(() => {
    getAvatarUrl();
  }, [getAvatarUrl]);

  return (
    <>
      {isLoading ? (
        <AvatarSpinner />
      ) : (
        <img
          className={props.className}
          src={props.override ? props.override : avatarUrl}
          alt="User's avatar"
        />
      )}
    </>
  );
};

export default Avatar;
