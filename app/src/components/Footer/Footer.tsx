import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import classes from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <div className={classes.footerSection}>
          <h3>eTicket</h3>
          <p>Your trusted platform for event ticketing</p>
        </div>
        <div className={classes.footerSection}>
          <h4>Quick Links</h4>
          <div>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
        <div className={classes.footerSection}>
          <h4>Connect With Us</h4>
          <div className={classes.socialLinks}>
            <Link aria-label="Facebook" href="/">
              <FaFacebookF />
            </Link>
            <Link aria-label="Twitter" href="#">
              <FaTwitter />
            </Link>
            <Link aria-label="LinkedIn" href="#">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.footerBottom}>
        <p>&copy; {new Date().getFullYear()} eTicket. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
