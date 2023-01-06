import MapCard from "./MapCard";
import PreviewMenu from "./PreviewMenu";
import "./StartMenu.css";
const StartMenu = ({ maps }) => {
  console.log("Render Start Menu");
  return (
    <div className="map-preview-list">
      {maps.map((map) => {
        console.log(maps.pokemonObjs);
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
