import "./App.css";
import PokemonMap from "./PokemonMap";
import { db, app } from "../modules/AppFirebase";
import {
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import StartMenu from "./StartMenu";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [mapState, setMaps] = useState({
    mapList: [],
  });

  const [loading, setLoading] = useState(false);
  const [currentMap, setCurrentMap] = useState({
    pokemonList: [],
    imageURL: "",
  });

  const selectMap = (pokemonList, imageURL) => {
    console.log("SELECTING MAP!");
    setCurrentMap({
      pokemonList: pokemonList,
      imageURL: imageURL,
    });
  };

  const getMaps = async () => {
    const mapRef = collection(db, "map");
    const mapSnapshot = await getDocs(mapRef);
    const maps = [];
    mapSnapshot.forEach((doc) => {
      maps.push(doc.data());
    });

    return maps;
  };

  const getPokemon = async (pokemonId) => {
    const pokemonRef = doc(db, "pokemon", pokemonId);
    const pokemonSnap = await getDoc(pokemonRef);
    return pokemonSnap;
  };
  //When component is mounted, fetch data then setTheState
  useEffect(() => {
    const fetchData = async () => {
      const myMaps = await getMaps();
      for (const map of myMaps) {
        map.pokemonObjs = [];
        for (const pokemonId of map.pokemons) {
          await getPokemon(pokemonId).then((result) => {
            console.log(result.data());
            map.pokemonObjs.push(result.data());
          });
        }
      }
      setMaps({
        mapList: myMaps,
      });
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <StartMenu maps={mapState.mapList} selectMap={selectMap} />
            }
          />
          <Route
            path="/game/:mapId"
            element={
              <PokemonMap
                pokemonMapUrl={currentMap.imageURL}
                pokemonList={currentMap.pokemonList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
