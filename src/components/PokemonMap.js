import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pokemonMap3 from "../pokemon-maps/03.jpg";
import "./PokemonMap.css";
import { db, getPokemon } from "../modules/AppFirebase";
const PokemonMap = ({ pokemonMapUrl, pokemonList }) => {
  const { mapId } = useParams();
  const [menu, setMenu] = useState({
    isOpen: false,
    imageX: 0,
    imageY: 0,
    menuX: 0,
    menuY: 0,
  });
  const [map, setMap] = useState({
    imageUrl: "",
    mapId: mapId,
    pokemons: [],
    pokemonObjs: [],
  });

  const getMap = async () => {
    let newMap;
    const q = query(
      collection(db, "map"),
      where("mapId", "==", parseInt(mapId))
    );
    const qSnapshot = await getDocs(q);
    qSnapshot.forEach((doc) => {
      newMap = doc.data();
    });

    return newMap;
  };
  useEffect(() => {
    getMap().then(async (result) => {
      console.log("mount", result);
      const pokemonObjs = [];

      for (const pokeId of result.pokemons) {
        await getPokemon(pokeId).then((result) => {
          pokemonObjs.push(result.data());
        });
      }

      setMap({
        imageUrl: result.imageURL,
        mapId: result.mapId,
        pokemons: result.pokemons,
        pokemonObjs: pokemonObjs,
      });
    });
  }, []);
  useEffect(() => {
    console.log(map);
  }, [map]);
  const closeMenu = () => {
    setMenu({
      ...menu,
      isOpen: false,
    });
  };

  const getNaturalHeightAndWidth = (event) => {
    const imgElem = document.querySelector("#pokemon-map");
    const bounds = imgElem.getBoundingClientRect();
    const left = bounds.left;
    const top = bounds.top;
    const x = event.pageX - left - window.scrollX;
    const y = event.pageY - top - window.scrollY;
    const cw = imgElem.clientWidth;
    const ch = imgElem.clientHeight;
    const iw = imgElem.naturalWidth;
    const ih = imgElem.naturalHeight;
    console.log(`event : ${event.pageX}, ${event.pageY}`);
    const px = (x / cw) * iw;
    const py = (y / ch) * ih;
    console.log(`pixel : ${px}, ${py}`);
    return [px, py];
  };
  const renderMenu = () => {
    console.log(map.pokemonObjs);
    if (menu.isOpen) {
      return (
        <div
          style={{ top: menu.menuY, left: menu.menuX, position: "absolute" }}
          id="menu"
          onDoubleClick={closeMenu}
          data-testid="menu"
        >
          {map.pokemonObjs &&
            map.pokemonObjs.map((pokemon) => {
              return <div>{pokemon.name}</div>;
            })}
        </div>
      );
    }
  };

  const openMenu = (event) => {
    const [px, py] = getNaturalHeightAndWidth(event);
    setMenu({
      ...menu,
      isOpen: true,
      imageX: px,
      imageY: py,
      menuX: event.pageX,
      menuY: event.pageY,
    });
  };

  return (
    <div data-testid="pokemon-map" onClick={openMenu} id="pokemon-map-wrapper">
      <div>{renderMenu()}</div>
      <img src={map.imageUrl} alt="pokemon-map" id="pokemon-map" />
    </div>
  );
};

export default PokemonMap;
