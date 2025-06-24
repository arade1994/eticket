import classes from "./Statistics.module.scss";

const Statistics: React.FC = () => {
  return (
    <section className={classes.stats}>
      <div className={classes.statCard}>
        <h3>Active Users</h3>
        <p>10,000+</p>
      </div>
      <div className={classes.statCard}>
        <h3>Events Listed</h3>
        <p>5,000+</p>
      </div>
      <div className={classes.statCard}>
        <h3>Successful Transactions</h3>
        <p>50,000+</p>
      </div>
    </section>
  );
};

export default Statistics;
