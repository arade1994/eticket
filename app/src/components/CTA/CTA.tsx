import classes from "./CTA.module.scss";

const CTA: React.FC = () => {
  const router = useRouter();

  return (
    <section className={classes.cta}>
      <h2>Ready to Get Started?</h2>
      <p>Join thousands of users who trust eTicket for their event needs</p>
      <button
        className={classes.ctaButton}
        onClick={() => router.push("/auth/signin")}
      >
        Sign Up Now
      </button>
    </section>
  );
};

export default CTA;
