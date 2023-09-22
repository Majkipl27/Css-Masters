import { MutatingDots, ThreeDots } from "react-loader-spinner";

interface LoaderProps {
  addClassName?: string;
  width?: string;
  height?: string;
}

export default function Loader({ addClassName, width, height }: LoaderProps) {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#24AFC1"
      ariaLabel="three-dots-loading"
      wrapperClass={addClassName}
      visible={true}
      wrapperStyle={{
        width: width || "100vw",
        height: height || "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    />
  );
}
