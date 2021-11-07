import Link from "next/link";

export default ({ currentUser }) => {
  let route = "";
  if (typeof window !== "undefined") route = window.location.pathname;

  const links = [
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    currentUser && { label: "Sell Tickets", href: "/tickets/create" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className={`nav-link ${route === href ? "active-link" : ""}`}>
              {label}
            </a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light header">
      <Link href="/">
        <a className="navbar-brand logo">eTicket</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
