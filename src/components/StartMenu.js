import { useState } from "react";
import Instruction from "./Instruction";
import LoadingScreen from "./LoadingScreen";
import MapCard from "./MapCard";
import "./StartMenu.css";
import User from "./User";
const StartMenu = ({ maps, selectMap, isLoading, user, submitUser }) => {
  const [isInstruction, setInstruction] = useState(true);
  if (isLoading) {
    return <LoadingScreen />;
  } else if (isInstruction) {
    return (
      <Instruction
        closeInstruction={() => {
          setInstruction(false);
        }}
      />
    );
  } else {
    if (!user.name) {
      return <User submitUser={submitUser} />;
    } else {
      return (
        <div className="map-preview-list">
          {maps.map((map) => {
            return (
              <MapCard
                key={`map${map.mapId}`}
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
