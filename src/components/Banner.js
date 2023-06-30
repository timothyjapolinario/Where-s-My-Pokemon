import { Link } from "react-router-dom";
import pokemonBanner from "../assets/pokemon_banner.webp";
import titleBanner from "../assets/title.webp";
const Banner = () => {
  return (
    <div className="relative w-full mb-[200px] md:mb-[200px] flex flex-col justify-center items-center">
      <div>
        <Link to={"/leaderboard"}>
          <span className="absolute right-[20vw] top-[50px]">LeaderBoard</span>
        </Link>
      </div>

      <div className="relative w-[300px] md:w-[300px]">
        <Link className="w-full" to={"/"}>
          <img src={pokemonBanner} className="absolute top-[-90px]" />
        </Link>
      </div>

      <div className="relative w-[300px] md:w-[300px]">
        <img src={titleBanner} className=" absolute top-[120px]" />
      </div>
    </div>
  );
};

export default Banner;
