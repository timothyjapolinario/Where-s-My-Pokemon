import { useState } from "react";
import Instruction from "./Instruction";
import LoadingScreen from "./LoadingScreen";
import MapCard from "../components/MapCard";
import "./StartMenu.css";
import User from "../components/User";

import Banner from "../components/Banner";
import MapCardList from "../components/MapCardList";
const StartMenu = ({ maps, selectMap, isLoading, user, submitUser }) => {
  const [isInstruction, setInstruction] = useState(true);
  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="start-menu-content w-full h-full flex items-center flex-col">
        <Banner />
        {!user.name && <User submitUser={submitUser} />}
        {user.name && <MapCardList maps={maps} selectMap={selectMap} />}
      </div>
    );
  }
};

//  else if (isInstruction) {
//     return (
//       <Instruction
//         closeInstruction={() => {
//           setInstruction(false);
//         }}
//       />
//     );
//   } else {
//     if (!user.name) {
//       return <User submitUser={submitUser} />;
//     } else {
//       return (
//         <div className="map-preview-list">
//           {maps.map((map) => {
//             return (
//               <MapCard
//                 key={`map${map.mapId}`}
//                 mapId={map.mapId}
//                 mapImage={map.imageURL}
//                 pokemonList={map.pokemonObjs}
//                 selectMap={selectMap}
//               />
//             );
//           })}
//         </div>
//       );
//     }
//   }

export default StartMenu;
