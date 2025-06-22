import { type ElementType } from "react";
import { ToastContainer } from "react-toastify";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { type Ticket } from "../../types/ticket";
import { type Rating, type User } from "../../types/user";

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
      <main className={classes.main}>
        <Component {...pageProps} />
      </main>
      <Footer />
      <ToastContainer
        closeOnClick
        draggable
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        autoClose={5000}
        hideProgressBar={false}
        position="top-right"
        rtl={false}
        theme="light"
      />
    </div>
  );
};

export default AppLayout;
