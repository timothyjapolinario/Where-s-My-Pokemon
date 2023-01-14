import { Link } from "react-router-dom";

const EndScreen = ({ msg }) => {
  return (
    <div>
      <div>{msg}</div>
      <div>
        <Link to={"/"}>Back to Menu</Link>
      </div>
    </div>
  );
};

export default EndScreen;
