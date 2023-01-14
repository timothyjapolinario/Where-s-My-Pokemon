import PreviewMenu from "./PreviewMenu";
import { useState } from "react";
const MapCard = ({ mapId, mapImage, pokemonList }) => {
  const [previewMenuState, setPreviewMenu] = useState(false);
  const togglePrevMenu = () => {
    setPreviewMenu(!previewMenuState);
  };
  return (
    <div className="map-preview">
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
      </div>
    </div>
  );
};

export default MapCard;
