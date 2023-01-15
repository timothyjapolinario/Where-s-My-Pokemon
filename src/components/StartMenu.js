import LoadingScreen from "./LoadingScreen";
import MapCard from "./MapCard";
import "./StartMenu.css";
import User from "./User";
const StartMenu = ({ maps, selectMap, isLoading, user, submitUser }) => {
  if (isLoading) {
    return <LoadingScreen />;
  } else {
    if (!user.name) {
      return <User submitUser={submitUser} />;
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
  }
};

export default StartMenu;
