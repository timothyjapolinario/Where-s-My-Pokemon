import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
    //console.log(`event : ${event.pageX}, ${event.pageY}`);
    const px = (x / cw) * iw;
    const py = (y / ch) * ih;
    //console.log(`pixel : ${px}, ${py}`);
    return [px, py];
  };
  const renderMenu = () => {
    if (menu.isOpen) {
      return (
        <div
          style={{ top: menu.menuY, left: menu.menuX, position: "absolute" }}
          id="menu"
          onDoubleClick={closeMenu}
          data-testid="menu"
        >
          <div id="menu-circle-mark">
            x
            <div
              id="menu-pokemon-list"
              style={{ position: "absolute", left: `${menu.listLocation}` }}
            >
              {map.pokemonObjs &&
                map.pokemonObjs.map((pokemon) => {
                  return (
                    <div
                      onClick={() => {
                        checkLocation(pokemon.x, pokemon.y);
                      }}
                    >
                      <div className="menu-pokemon-name"> {pokemon.name}</div>
                      <img
                        src={pokemon.imageUrl}
                        alt="pokeimg"
                        className="menu-pokemon-img"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    }
  };

  const checkLocation = (x, y) => {
    console.log("pokemon: ", x, y);
  };
  const openMenu = (event) => {
    const imgElem = document.querySelector("#pokemon-map");
    const [px, py] = getNaturalHeightAndWidth(event);
    const isOnRight = imgElem.naturalWidth / 2 > px;
    setMenu({
      ...menu,
      isOpen: true,
      imageX: px,
      imageY: py,
      menuX: event.pageX - window.innerWidth / 15,
      menuY: event.pageY - window.innerWidth / 15,
      listLocation: isOnRight ? "15vw" : "-15vw",
    });
  };

  return (
    <div data-testid="pokemon-map" id="pokemon-map-wrapper">
      <img
        src={map.imageUrl}
        alt="pokemon-map"
        id="pokemon-map"
        onClick={openMenu}
      />
      <div>{renderMenu()}</div>
    </div>
  );
};

export default PokemonMap;
