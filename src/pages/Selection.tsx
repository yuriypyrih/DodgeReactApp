import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Cube from "../components/Cube";

let levels: {
  title: string;
}[] = [{ title: "1" }, { title: "2" }, { title: "3" }];

const Selection: React.FC = ({}) => {
  return (
    <div className="menu menu-levels" id="menu-levels">
      <button className="menu-levels_journal">
        <svg className="menu-icon menu-icon--white">
          <use href="assets/svg/symbol-defs.svg#icon-book"></use>
        </svg>
        Journal
      </button>
      <div className="menu-levels_collection">
        {levels.map((i, key) => (
          <Cube title={i.title} />
        ))}
      </div>
      <Link
        to="/Home"
        className="menu-levels_back button-style"
        id="btn-levels-back"
      >
        Back
      </Link>
    </div>
  );
};

export default Selection;
