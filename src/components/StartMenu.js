import LoadingScreen from "./LoadingScreen";
import MapCard from "./MapCard";
import "./StartMenu.css";
const StartMenu = ({ maps, selectMap, isLoading }) => {
  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="map-preview-list">
        {maps.map((map) => {
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
  }
};

export default StartMenu;
