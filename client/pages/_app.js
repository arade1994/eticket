import buildClient from "../api/buildClient";
import AppLayout from "../layouts/AppLayout/AppLayout";

import "../style/style.scss";

const AppComponent = (props) => {
  return <AppLayout {...props} />;
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
