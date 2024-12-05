import { ElementType } from "react";
import { ToastContainer } from "react-toastify";

import Header from "../../components/Header/Header";
import { Rating, type User } from "../../types/user";

import { Ticket } from "../../types/ticket";

import classes from "./AppLayout.module.scss";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../../components/Navigation/Navigation";

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
    // <div className="app">
    //   <div className="container">
    //     <Component currentUser={currentUser} {...pageProps} />
    //   </div>
    //
    // </div>
    <div className={classes.app}>
      <header className={classes.headerContainer}>
        <Header currentUser={currentUser} />
      </header>
      <aside className={classes.navigationContainer}>
        <Navigation />
      </aside>
      <main className={classes.contentContainer}>
        <Component currentUser={currentUser} {...pageProps} />
      </main>
      <aside className={classes.notificationsContainer}></aside>
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
