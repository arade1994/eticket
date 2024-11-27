import { ToastContainer } from "react-toastify";

import buildClient from "../api/buildClient";
import Header from "../components/Header";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "../style/style.scss";

require("dotenv").config();

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div className="page">
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
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

AppComponent.getInitialProps = async (appContext) => {
  const isDemoMode = !!process.env.NEXT_PUBLIC_DEMO_MODE;
  const client = buildClient(appContext.ctx);
  const { data } = await client.get(
    !isDemoMode ? "/api/users/currentuser" : "/currentUser"
  );

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return { pageProps, ...data };
};

export default AppComponent;
