import Link from "next/link";
import { type User } from "../types/user";
import ProfileIcon from "./ProfileIcon";

interface Props {
  currentUser: User;
}

interface LinkMap {
  label: string;
  href: string;
}

export default ({ currentUser }: Props) => {
  let route = "";
  if (typeof window !== "undefined") route = window.location.pathname;

  const links: JSX.Element[] = (
    [
      !currentUser && { label: "Sign In", href: "/auth/signin" },
      !currentUser && { label: "Sign Up", href: "/auth/signup" },
      currentUser && { label: "Buy Ticket", href: "/" },
      currentUser && { label: "Sell Ticket", href: "/tickets/create" },
      currentUser && { label: "My Orders", href: "/orders" },
      currentUser && { label: "Users", href: "/users" },
      currentUser && { label: "Sign Out", href: "/auth/signout" },
    ] as LinkMap[]
  )
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link
            className={`nav-link ${route === href ? "active-link" : ""}`}
            href={href}
          >
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light header">
      <Link className="navbar-brand logo" href="/">
        eTicket
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
        {currentUser && (
          <ProfileIcon
            firstName={currentUser.firstName}
            lastName={currentUser.lastName}
          />
        )}
      </div>
    </nav>
  );
};
