import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonMap.css";
import { db, getPokemon } from "../modules/AppFirebase";
import LoadingScreen from "./LoadingScreen";
import Timer from "./Timer";
import EndScreen from "./EndScreen";
const PokemonMap = ({ pokemonMapUrl, pokemonList, updateUser, user }) => {
  const { mapId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [menu, setMenu] = useState({
    isOpen: true,
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
    isGameover: false,
  });

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  //timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (!map.isGameover && user.name !== "") {
        if (seconds < 60) {
          setSeconds(seconds + 1);
        } else {
          setSeconds(0);
          setMinutes(minutes + 1);
        }
      }
    }, 1000);
    if (map.isGameover) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, map.isGameover]);

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

  //When game is over
  useEffect(() => {
    if (map.pokemonObjs.length === 0) {
      let minString = minutes;
      let secString = seconds;
      if (minutes < 10) {
        minString = "0" + minutes;
      }
      if (seconds < 10) {
        secString = "0" + seconds;
      }
      if (minutes !== 0 || seconds !== 0) {
        updateUser(minString, secString, map.mapId);
      }

      setMap({
        ...map,
        isGameover: true,
      });
      setMenu({
        ...menu,
      });
    }
  }, [map.pokemonObjs]);

  //Fetches map and sets the map data.
  useEffect(() => {
    getMap().then(async (result) => {
      const pokemonObjs = [];

      for (const pokeId of result.pokemons) {
        await getPokemon(pokeId).then((result) => {
          pokemonObjs.push(result.data());
        });
      }

      setMap({
        ...map,
        imageUrl: result.imageURL,
        mapId: result.mapId,
        pokemons: result.pokemons,
        pokemonObjs: pokemonObjs,
      });
      setLoading(false);
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
    const px = (x / cw) * iw;
    const py = (y / ch) * ih;
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
            <div
              id="menu-pokemon-list"
              className={menu.isOnRight ? "menu-on-right" : "menu-on-left"}
              style={{
                position: "absolute",
                top: `${menu.pokemonListPosTop}`,
              }}
            >
              <Timer seconds={seconds} minutes={minutes} />
              {map.pokemonObjs &&
                map.pokemonObjs.map((pokemon) => {
                  return (
                    <div
                      key={pokemon.name + "-menu"}
                      onClick={() => {
                        checkLocation(pokemon.x, pokemon.y, pokemon.name);
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

  const checkLocation = (x, y, pokemonName) => {
    const maxX = menu.circleMarkRadius + menu.imageX;
    const minX = menu.imageX - menu.circleMarkRadius;
    const maxY = menu.circleMarkRadius + menu.imageY;
    const minY = menu.imageY - menu.circleMarkRadius;
    if (x > minX && x < maxX && y > minY && y < maxY) {
      const newPokemonObjs = map.pokemonObjs.filter((poke) => {
        return poke.name !== pokemonName;
      });
      setMap({
        ...map,
        pokemonObjs: newPokemonObjs,
      });
    }
  };
  const openMenu = (event) => {
    const imgElem = document.querySelector("#pokemon-map");
    const [px, py] = getNaturalHeightAndWidth(event);
    const isOnRight = imgElem.naturalWidth / 2 > px;
    let menuPos;

    if (imgElem.naturalHeight - imgElem.naturalHeight * 0.08 < py) {
      menuPos = "-23vh";
    } else if (py < imgElem.naturalHeight * 0.05) {
      menuPos = "20vh";
    } else {
      menuPos = "-2vh";
    }
    setMenu({
      ...menu,
      isOpen: true,
      imageX: px,
      imageY: py,
      menuX: event.pageX - window.innerWidth / 15,
      menuY: event.pageY - 100 - window.innerWidth / 15,
      listLocation: isOnRight ? "15vw" : "-15vw",
      circleMarkRadius: 60,
      pokemonListPosTop: menuPos,
      isOnRight: isOnRight,
    });
  };
  if (isLoading) {
    return <LoadingScreen />;
  } else if (user.name === "") {
    return (
      <EndScreen msg="Uh-oh! You forgot to set a user. Please go back to menu." />
    );
  } else if (map.isGameover) {
    const minutesString =
      minutes.toString().length === 1 ? "0" + minutes : minutes;
    const secondsString =
      seconds.toString().length === 1 ? "0" + seconds : seconds;
    return (
      <EndScreen
        msg={`Game is over! Your time is ${minutesString}:${secondsString}`}
      />
    );
  } else {
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
  }
};

export default PokemonMap;
