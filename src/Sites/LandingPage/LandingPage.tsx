import classes from './LandingPage.module.css';
import Logo from '../../Graphics/Logo.svg';
import Button from '../../Components/Button';
import { motion } from 'framer-motion';

export default function LandingPage() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 }}}
        className={classes.main}
      >
        <div className={classes.textSection}>
          <h1>Css Masters</h1>
          <p>
            Want to check your css level? Maybe learn something new? Or maybe
            show off to your friends?
          </p>
          <p>
            Regardless of the purpose, everyone will find something for
            themselves here.
          </p>
          <Button
            type="alt"
            isLink={true}
            to="/play"
            className={classes.button}
          >
            Jump in!
          </Button>
        </div>
        <img src={Logo} alt="css-masters-logo" />
      </motion.div>
    );
}