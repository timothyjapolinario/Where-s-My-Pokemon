import "./Timer.css";
const Timer = ({ seconds, minutes }) => {
  return (
    <div className="Timer">{`${
      minutes.toString().length === 1 ? "0" + minutes : minutes
    } : ${seconds.toString().length === 1 ? "0" + seconds : seconds}`}</div>
  );
};

export default Timer;
