import "./App.css";
import PokemonMap from "./PokemonMap";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import StartMenu from "./StartMenu";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyACsFbNW8Ga967uyHd3CPAhctq5rEyVr1U",
  authDomain: "where-s-my-pokemon.firebaseapp.com",
  projectId: "where-s-my-pokemon",
  storageBucket: "where-s-my-pokemon.appspot.com",
  messagingSenderId: "338974024386",
  appId: "1:338974024386:web:286b16dea12545bd8a915b",
  measurementId: "G-PJLNYKWV9D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [mapState, setMaps] = useState({
    mapList: [],
    isLoading: true,
  });

  //When component is mounted, fetch data then setTheState

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

  useEffect(() => {
    const fetchData = async () => {
      const myMaps = await getMaps();
      // const updatedMaps = myMaps.map(async (map) => {

      // });

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
        isLoading: false,
      });
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {!mapState.isLoading && <StartMenu maps={mapState.mapList} />}
    </div>
  );
}

export default App;
