import { ChangeEvent } from "react";
import classes from "./RateInput.module.scss";

interface Props {
  comment: string;
  onChangeComment: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeRate: (value: number) => void;
}

const RateInput = ({ comment, onChangeComment, onChangeRate }: Props) => {
  return (
    <div className={classes.rateInputContainer}>
      <div className={classes.rate}>
        {Array.from(Array(5).keys())
          .sort((a, b) => b - a)
          .map((index) => (
            <>
              <input
                type="radio"
                id={`star${index}`}
                name="rating"
                value={index}
              />
              <label
                htmlFor={`star${index}`}
                className={classes.star}
                onClick={() => onChangeRate(index + 1)}
              >
                &#9733;
              </label>
            </>
          ))}
      </div>
      <div className={classes.comment}>
        <label htmlFor="comment">Tell us more:</label>
        <br />
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={onChangeComment}
        ></textarea>
      </div>
    </div>
  );
};

export default RateInput;
