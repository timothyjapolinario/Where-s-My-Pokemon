import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div id="Header">
      <div>
        <Link to={"/"}>Where's My Pokemon!</Link>
      </div>
      <div id="leader-board-link">
        <Link to={"/leaderboard"}>LeaderBoard</Link>
      </div>
    </div>
  );
};

export default Header;
