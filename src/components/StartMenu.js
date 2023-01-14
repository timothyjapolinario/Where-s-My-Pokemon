import LoadingScreen from "./LoadingScreen";
import MapCard from "./MapCard";
import "./StartMenu.css";
import User from "./User";
const StartMenu = ({ maps, selectMap, isLoading, user, submitUser }) => {
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
        {!user.name && <User submitUser={submitUser} />}
      </div>
    );
  }
};

export default StartMenu;
