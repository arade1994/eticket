import { ElementType } from "react";
import { ToastContainer } from "react-toastify";

import Header from "../../components/Header/Header";
import { Rating, type User } from "../../types/user";

import { Ticket } from "../../types/ticket";

import classes from "./AppLayout.module.scss";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../../components/Navigation/Navigation";
import NotificationCenter from "../../components/NotificationCenter/NotificationCenter";

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
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AppLayout;
