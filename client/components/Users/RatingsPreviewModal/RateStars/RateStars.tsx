import cx from "classnames";

import classes from "./RateStars.module.scss";

interface Props {
  rate: number;
}

const RateStars = ({ rate }: Props) => {
  return (
    <div className={classes.starsContainer}>
      {Array.from(Array(rate).keys()).map((index) => (
        <div key={index} className={classes.rate}>
          <label
            aria-label="star"
            className={cx(
              classes.star,
              index + 1 <= rate ? classes.checked : ""
            )}
            htmlFor={`star${index}`}
          >
            &#9733;
          </label>
        </div>
      ))}
    </div>
  );
};

export default RateStars;
