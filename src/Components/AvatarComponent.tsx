import { useState, useCallback, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import Avatar from "react-avatar";

const AvatarComponent = (props: {
  userId: number;
  className?: any;
  userNameForAvatar: string;
  size?: "verySmall" | "small" | "medium" | "big";
}) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const AvatarSpinner = () => (
    <ColorRing
      visible={true}
      width={
        props.size === "verySmall"
          ? "1.5rem"
          : props.size === "small"
          ? "3rem"
          : props.size === "medium"
          ? "8rem"
          : "12rem"
      }
      height={
        props.size === "verySmall"
          ? "1.5rem"
          : props.size === "small"
          ? "3rem"
          : props.size === "medium"
          ? "8rem"
          : "12rem"
      }
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#212121", "#343A40", "#ADB5BD", "#F8F9FA", "#24AFC1"]}
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
        <img
          className={props.className}
          style={{
            width:
              props.size === "verySmall"
                ? "1.5rem"
                : props.size === "small"
                ? "3rem"
                : props.size === "medium"
                ? "8rem"
                : "12rem",

            height:
              props.size === "verySmall"
                ? "1.5rem"
                : props.size === "small"
                ? "3rem"
                : props.size === "medium"
                ? "8rem"
                : "12rem",

            borderRadius: "50%",
          }}
          src={avatarUrl}
          alt="User's avatar"
        />
      ) : (
        <Avatar
          name={props.userNameForAvatar}
          size={
            props.size === "verySmall"
              ? "1.5rem"
              : props.size === "small"
              ? "3rem"
              : props.size === "medium"
              ? "8rem"
              : "12rem"
          }
          round={true}
        />
      )}
    </>
  );
};

export default AvatarComponent;
