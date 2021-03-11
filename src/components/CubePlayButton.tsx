import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { setLevel } from "../redux/slices/gameSlice";

type CubePlayButtonProps = {
  title: number;
};

const CubePlayButton: React.FC<CubePlayButtonProps> = ({ title }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setLevel(Number(title)));
  };

  return (
    <Link
      to={`/Game`}
      className="menu-levels_select"
      id="btn-select-1"
      onClick={handleClick}
    >
      {title}
    </Link>
  );
};

export default CubePlayButton;
