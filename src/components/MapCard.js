import PreviewMenu from "../pages/PreviewMenu";
import clickLogo from "../assets/click-logo.webp";
import { useState } from "react";
const MapCard = ({ mapId, mapImage, pokemonList }) => {
  const [previewMenuState, setPreviewMenu] = useState(false);
  const togglePrevMenu = () => {
    setPreviewMenu(!previewMenuState);
  };
  return (
    <div className="map-preview relative">
      <div>
        <PreviewMenu
          previewMenuState={previewMenuState}
          togglePrevMenu={togglePrevMenu}
          pokemonList={pokemonList}
          mapId={mapId}
        />
        <img
          className="map-preview-image"
          src={mapImage}
          alt="pokemonMap-preview"
          onClick={togglePrevMenu}
        />
        <img
          src={clickLogo}
          className={`absolute top-[50%] w-[70px] left-[40%] ${
            previewMenuState ? "hidden" : "block"
          }`}
        />
      </div>
    </div>
  );
};

export default MapCard;
