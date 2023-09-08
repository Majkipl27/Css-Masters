import { useParams } from "react-router-dom";
import classes from "./Profile.module.css";
import { PersonCircle, Link45deg } from "react-bootstrap-icons";

export default function Profile() {
  const id = useParams<{ id: string }>().id;

  return (
    <div className={classes.main}>
      <div className={classes.avatarSection}>
        <PersonCircle />
        <h2>[Username] | [Name] [Surname]</h2>
        <p>Followers: [21] | Following: [37]</p>
      </div>
      <div className={classes.mainRow}>
        <div className={classes.left}>
          <div>
            <p>About [Username]</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              commodi officia libero veritatis at, minima voluptate iure quaerat
              amet, adipisci magni. Tenetur vero dignissimos animi facere omnis.
              Culpa quidem perspiciatis dolores? Quo, dolorum quos? Non fuga
              quos consequatur molestiae saepe, ea, pariatur aut quae corrupti
              minima vel consectetur fugit odio blanditiis! Eligendi, blanditiis
              delectus, facere odit repudiandae molestiae a at quia repellendus
              laudantium saepe asperiores, atque consequuntur. Praesentium
              recusandae iure officia id, quis eum quod, velit debitis corporis
              laudantium iusto?
            </p>
          </div>
          <div className={classes.socials}>
            <div className={classes.lineHorizontal} />
            {/*
              TODO: Make socials mapping when backend will be ready
            */}
            <div className={classes.social}>
              <Link45deg />
              <a href="https://tmamala.pl" target="_blank">
                tmamala.pl
              </a>
            </div>
          </div>
        </div>
        <div className={classes.line} />
        <div className={classes.right}>
          <div className={classes.badgesSection}>
            <p>Badges</p>
            <div className={classes.badges}>
              {/*
              TODO: Make badges mapping when backend will be ready
            */}
              <div className={classes.badge} />
              <div className={classes.badge} />
              <div className={classes.badge} />
              <div className={classes.badge} />
            </div>
          </div>
          <div className={classes.statisticsSection}>
            <div className={classes.statistic}>
              <p>Overall Points</p>
              <p>[Points]</p>
            </div>
            <div className={classes.statistic}>
              <p>Challenges done</p>
              <p>[Challenges done]</p>
            </div>
          </div>
          <div className={classes.tagsSection}>
            <p>Favourite tags</p>
            <div className={classes.tags}>
              {/*
                Make tags mapping when backend will be ready
              */}
              <div className={classes.tag}>[Tag]</div>
            </div>
          </div>
          <p className={classes.lastActive}>Last Active: [DD.MM.YYYY]</p>
        </div>
      </div>
    </div>
  );
}
