import "./App.css";
import PokemonMap from "./PokemonMap";
import { db, app } from "../modules/AppFirebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import StartMenu from "./StartMenu";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getPokemon } from "../modules/AppFirebase";
import Header from "./Header";
function App() {
  const [mapState, setMaps] = useState({
    mapList: [],
  });
  const [user, setUser] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(true);
  const [currentMap, setCurrentMap] = useState({
    pokemonList: [],
    imageURL: "",
  });

  const selectMap = (pokemonList, imageURL) => {
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

  //When component is mounted, fetch data then setTheState
  useEffect(() => {
    const fetchData = async () => {
      const myMaps = await getMaps();
      for (const map of myMaps) {
        map.pokemonObjs = [];
        for (const pokemonId of map.pokemons) {
          await getPokemon(pokemonId).then((result) => {
            map.pokemonObjs.push(result.data());
          });
        }
      }
      setMaps({
        mapList: myMaps,
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  const submitUser = async (newUserName) => {
    let user;
    const userRef = doc(db, "users", newUserName.toLowerCase());
    if (userRef) {
      user = (await getDoc(userRef)).data();
      console.log(user);
    } else {
      user = {
        name: newUserName,
      };
      await setDoc(userRef, user);
    }
    setUser(user);
  };
  const updateUser = async (minutes, seconds, mapId) => {
    const map = "map" + mapId + "Time";
    const userRef = doc(db, "users", user.name.toLowerCase());
    const updatedUser = {
      ...user,
      [map]: `${minutes} : ${seconds}`,
    };
    await setDoc(userRef, updatedUser);
    setUser(updatedUser);
  };
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <StartMenu
                maps={mapState.mapList}
                selectMap={selectMap}
                isLoading={loading}
                user={user}
                submitUser={submitUser}
              />
            }
          />
          <Route
            path="/game/:mapId"
            element={
              <PokemonMap
                pokemonMapUrl={currentMap.imageURL}
                pokemonList={currentMap.pokemonList}
                updateUser={updateUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
