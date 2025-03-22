import { HOMEPAGE_FEATURES } from "../../constants/data";

import classes from "./Features.module.scss";

const Features: React.FC = () => {
  return (
    <section className={classes.features}>
      <h2>Why Choose eTicket?</h2>
      <div className={classes.featuresGrid}>
        {HOMEPAGE_FEATURES.map((feature, index) => (
          <div key={index} className={classes.featureCard}>
            <div
              className={classes.featureIcon}
              style={{ color: feature.color }}
            >
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
