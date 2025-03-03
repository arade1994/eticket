import { type ElementType } from "react";
import { ToastContainer } from "react-toastify";

import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import NotificationCenter from "../../components/NotificationCenter/NotificationCenter";
import { type Ticket } from "../../types/ticket";
import { type Rating, type User } from "../../types/user";

import "react-toastify/dist/ReactToastify.css";
import classes from "./AppLayout.module.scss";

interface Props {
  Component: ElementType;
  pageProps: {
    ratings: Rating[];
    tickets: Ticket[];
    users: User[];
  };
  currentUser: User;
}

const AppLayout: React.FC<React.PropsWithChildren<Props>> = ({
  Component,
  pageProps,
  currentUser,
}) => {
  return (
    <div className={classes.app}>
      <Header currentUser={currentUser} />
      {currentUser && <Navigation />}
      <Component currentUser={currentUser} {...pageProps} />
      {currentUser && <NotificationCenter />}
      <ToastContainer
        closeOnClick
        draggable
        pauseOnFocusLoss
        pauseOnHover
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        position="bottom-right"
        rtl={false}
        theme="colored"
      />
    </div>
  );
};

export default AppLayout;
