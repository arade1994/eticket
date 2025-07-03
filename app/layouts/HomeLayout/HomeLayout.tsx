import CTA from "../../components/CTA/CTA";
import Features from "../../components/Features/Features";
import Hero from "../../components/HeroContent/Hero";
import Statistics from "../../components/Statistics/Statistics";
import { type User } from "../../types/user";

import classes from "./HomeLayout.module.scss";

interface Props {
  currentUser?: User;
}

const HomeLayout: React.FC<React.PropsWithChildren<Props>> = ({
  currentUser,
}) => {
  return (
    <div className={classes.homePage}>
      <Hero currentUser={currentUser} />
      <Features />
      <Statistics />
      <CTA />
    </div>
  );
};

export default HomeLayout;
