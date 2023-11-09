import { motion } from "framer-motion";
import classes from "./ErrorElement.module.css";
import Button from "../Components/Button";

export default function ErrorElement() {
  return (
    <motion.div
      className={classes.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <h1>Page not found</h1>
      <Button type="default" isLink={true} to="/">Back to main page</Button>
    </motion.div>
  );
}
