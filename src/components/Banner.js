import pokemonBanner from "../assets/pokemon_banner.webp";
import titleBanner from "../assets/title.webp";
const Banner = () => {
  return (
    <div className="relative w-full mb-[200px] md:mb-[30vh] flex flex-col justify-center items-center">
      <div className="relative w-[300px] md:w-[300px]">
        <img src={pokemonBanner} className="absolute top-[-90px]" />
      </div>
      <div className="relative w-[300px] md:w-[300px]">
        <img src={titleBanner} className=" absolute top-[120px]" />
      </div>
    </div>
  );
};

export default Banner;
