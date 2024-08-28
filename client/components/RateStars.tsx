interface Props {
  rate: number;
}

const RateStars = ({ rate }: Props) => {
  return Array.from(Array(5).keys()).map((index) => (
    <div className="rating" style={{ marginBottom: 0 }}>
      <label
        htmlFor={`star${index}`}
        className={`star ${index + 1 <= rate ? "checked" : ""}`}
      >
        &#9733;
      </label>
    </div>
  ));
};

export default RateStars;
