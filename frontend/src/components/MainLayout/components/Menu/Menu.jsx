import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Menu.css";
import Navigation from "../Navigation/Navigation";
import face from "../../../../assets/face.png";
import linkedin from "../../../../assets/linkedin.png";
import tweet from "../../../../assets/tweet.png";
import ig from "../../../../assets/ig.png";
import useMenuActions from "./useMenuActions";

const socialMedia = [
  { icon: face, id: 4 },
  { icon: linkedin, id: 5 },
  { icon: tweet, id: 6 },
  { icon: ig, id: 7 },
];

export default function Menu({ closeHandler }) {
  const { showList } = useMenuActions();
  return (
    <div className="menu-container">
      <div className="top-menu-container">
        <div className="close-icon-container">
          <FontAwesomeIcon
            className="icon"
            onClick={closeHandler}
            icon={faXmark}
          />
        </div>
        <div className="menu-title-container">
          <h3 className="menu-title">Menú</h3>
        </div>
      </div>
      <div className="bottom-menu-container">
        <Navigation navList={showList} />
        <ul className="social-media-list">
          {socialMedia.map(({ icon, id }) => (
            <li key={id}>
              <img src={icon} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
