import pikachuRunning from "../pikachu-running.gif";
import "./LoadingScreen.css";
const LoadingScreen = () => {
  return (
    <div id="loading-screen">
      <div id="loading-upper" />
      <div id="loading-middle" />

      <div id="loading-lower" />
      <div id="circle-pokeball"></div>
      <img src={pikachuRunning} alt="pikachu-running" id="running-pikachu" />
    </div>
  );
};

export default LoadingScreen;
