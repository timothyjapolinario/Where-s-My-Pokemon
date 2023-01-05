import { useState } from "react";
import PreviewMenu from "./PreviewMenu";
import "./StartMenu.css";
const StartMenu = ({ maps }) => {
  const MapCard = ({ mapName, mapImage, pokemonList }) => {
    const [previewMenuState, setPreviewMenu] = useState(false);
    const togglePrevMenu = () => {
      setPreviewMenu(!previewMenuState);
    };
    return (
      <div className="map-preview">
        <div className="map-preview-name">{mapName}</div>
        <div>
          <PreviewMenu
            previewMenuState={previewMenuState}
            togglePrevMenu={togglePrevMenu}
            pokemonList={pokemonList}
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
  return (
    <div className="map-preview-list">
      {maps.map((map) => {
        return (
          <MapCard
            mapName={map.mapId}
            mapImage={map.imageURL}
            pokemonList={map.pokemonObjs}
          />
        );
      })}
    </div>
  );
};

export default StartMenu;
