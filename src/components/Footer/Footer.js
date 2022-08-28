import { Link } from "react-router-dom";
import PlayStoreLogos from "../UI/PlayStoreLogos/PlayStoreLogos";
import footerLinksData from "./footerLinksData";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Card from "../UI/Card/Card";
import classes from "./Footer.module.scss";

const Footer = () => {
  const footerLinks = footerLinksData.map((item, i) => (
    <ul key={i}>
      <h4>{item.title}</h4>
      {item.links.map((link, i) => (
        <li key={i}>
          <Link to={link.to}>{link.title}</Link>
        </li>
      ))}
    </ul>
  ));

  return (
    <footer>
      <Card className={classes["footer-link-container"]}>
        {footerLinks}
        <div>
          <h4>Install App</h4>
          <PlayStoreLogos className={classes["play-store"]} />
        </div>
      </Card>
      <div className={classes["copyright-box"]}>
        <Card className={classes["copyright-container"]}>
          <p>© 2021 LILIES, All rights reserved</p>
          <div>
            <a href="https://www.instagram.com/?hl=en">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/">
              <FaTwitter />
            </a>
            <a href="https://www.youtube.com/">
              <FaYoutube />
            </a>
          </div>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;
