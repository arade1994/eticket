import {
  FaCalendarAlt,
  FaCreditCard,
  FaSearch,
  FaShieldAlt,
} from "react-icons/fa";

import { type User } from "../../types/user";

import classes from "./Hero.module.scss";

interface Props {
  currentUser?: User;
}

const HeroContent: React.FC<React.PropsWithChildren<Props>> = ({
  currentUser,
}) => {
  const router = useRouter();

  return (
    <section className={classes.hero}>
      <div className={classes.heroContent}>
        <div className={classes.heroText}>
          <h1>
            <span className={classes.highlight}>Transform</span> Your Event
            Experience
          </h1>
          <p className={classes.heroDescription}>
            Discover, buy, and sell event tickets with confidence. Join
            thousands of event enthusiasts in the most secure and user-friendly
            ticket marketplace.
          </p>
          <div className={classes.heroFeatures}>
            <div className={classes.heroFeature}>
              <FaSearch className={classes.featureIcon} />
              <span>Easy Ticket Discovery</span>
            </div>
            <div className={classes.heroFeature}>
              <FaCalendarAlt className={classes.featureIcon} />
              <span>Real-time Updates</span>
            </div>
            <div className={classes.heroFeature}>
              <FaShieldAlt className={classes.featureIcon} />
              <span>Secure Transactions</span>
            </div>
          </div>
          <div className={classes.ctaContainer}>
            {!currentUser && (
              <button
                className={`${classes.ctaButton} ${classes.primaryButton}`}
                onClick={() => router.push("/auth/signin")}
              >
                Get Started Now
              </button>
            )}
            <button
              className={`${classes.ctaButton} ${classes.secondaryButton}`}
              onClick={() => router.push("/tickets")}
            >
              Browse Tickets
            </button>
          </div>
        </div>
        <div className={classes.heroImage}>
          <div className={classes.imageContainer}>
            <div className={classes.placeholderImage}>
              <FaCreditCard className={classes.largeIcon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContent;
