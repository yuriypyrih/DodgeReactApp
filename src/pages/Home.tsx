import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Home: React.FC = ({}) => {
  return (
    <div className="menu menu-main">
      <div className="menu-main_username">
        <svg className="menu-icon menu-icon--blue">
          <use href="../assets/svg/symbol-defs.svg#icon-user"></use>
        </svg>

        <p>Guest</p>
      </div>
      <p className="menu-main_title">Dodge</p>
      <button className="menu-main_login">LOGIN</button>
      <div className="menu-main_buttons">
        <Link to="/Selection" className="menu-main_buttons_item button-style">
          PLAY
        </Link>
        <Link to="/Game" className="menu-main_buttons_item button-style">
          ACHIEVEMENTS
        </Link>
        <Link to="/Game" className="menu-main_buttons_item button-style">
          SETTINGS
        </Link>
      </div>
    </div>
  );
};

export default Home;
