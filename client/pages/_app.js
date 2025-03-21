import buildClient from "../api/buildClient";
import AppLayout from "../layouts/AppLayout/AppLayout";

import "../style/style.scss";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <AppLayout
      Component={Component}
      currentUser={currentUser}
      pageProps={pageProps}
    />
  );
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  const isDemoMode = !!process.env.NEXT_PUBLIC_DEMO_MODE;
  const client = buildClient(ctx);

  try {
    const { data } = await client.get(
      !isDemoMode ? "/api/users/currentuser" : "/currentUser"
    );

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(
        ctx,
        client,
        data.currentUser
      );
    }

    return { pageProps, currentUser: data.currentUser };
  } catch {
    // Handle case where user is not authenticated
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx, client, null);
    }

    return { pageProps, currentUser: null };
  }
};

export default AppComponent;
