import { useState, useCallback, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import Avatar from "react-avatar";

const AvatarComponent = (props: { userId: number; className?: any; userNameForAvatar: string; size?: "small" | "medium" | "big"}) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const AvatarSpinner = () => (
    <ColorRing
      visible={true}
      width={
        props.size === "small"
          ? "1.5rem"
          : props.size === "medium"
          ? "8rem"
          : "12rem"
      }
      height={
        props.size === "small"
          ? "1.5rem"
          : props.size === "medium"
          ? "8rem"
          : "12rem"
      }
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
      .catch(() => setAvatarUrl(""))
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
      ) : avatarUrl ? (
        <img className={props.className} src={avatarUrl} alt="User's avatar" />
      ) : (
        <Avatar
          name={props.userNameForAvatar}
          size={props.size === "small" ? "1.5rem" : props.size === "medium" ? "8rem" : "12rem"}
          round={true}
        />
      )}
    </>
  );
};

export default AvatarComponent;
