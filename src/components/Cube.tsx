import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

type CubeProps = {
  title: number;
};

const Cube: React.FC<CubeProps> = ({ title }) => {
  return (
    <Link
      to={`/Game?level=${title}`}
      className="menu-levels_select"
      id="btn-select-1"
    >
      {title}
    </Link>
  );
};

export default Cube;
