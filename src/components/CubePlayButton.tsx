import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

type CubePlayButtonProps = {
  title: number;
};

const CubePlayButton: React.FC<CubePlayButtonProps> = ({ title }) => {
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

export default CubePlayButton;
