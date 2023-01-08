import MapCard from "./MapCard";
import "./StartMenu.css";
const StartMenu = ({ maps, selectMap }) => {
  return (
    <div className="map-preview-list">
      {maps.map((map) => {
        console.log(maps.pokemonObjs);
        return (
          <MapCard
            mapId={map.mapId}
            mapImage={map.imageURL}
            pokemonList={map.pokemonObjs}
            selectMap={selectMap}
          />
        );
      })}
    </div>
  );
};

export default StartMenu;
