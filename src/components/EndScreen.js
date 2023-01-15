import { Link } from "react-router-dom";
import "./EndScreen.css";
const EndScreen = ({ msg }) => {
  return (
    <div className="EndScreen">
      <div className="end-screen-msg">{msg}</div>
      <div className="button-to-menu">
        <Link to={"/"}>Back to Menu</Link>
      </div>
    </div>
  );
};

export default EndScreen;
