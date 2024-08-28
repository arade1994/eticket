import { Dispatch, SetStateAction } from "react";

interface Props {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  setRate: Dispatch<SetStateAction<number>>;
}

const RateInput = ({ comment, setComment, setRate }: Props) => {
  return (
    <>
      <div className="rating">
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
                className="star"
                onClick={() => setRate(index + 1)}
              >
                &#9733;
              </label>
            </>
          ))}
      </div>
      <div className="comment">
        <label htmlFor="comment">Tell us more:</label>
        <br />
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default RateInput;
