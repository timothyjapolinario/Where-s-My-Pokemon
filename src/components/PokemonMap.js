import { useState } from "react";
import pokemonMap1 from "../pokemon-maps/01.jpg";
import pokemonMap2 from "../pokemon-maps/02.jpg";
import pokemonMap3 from "../pokemon-maps/03.jpg";
import "./PokemonMap.css";
const PokemonMap = ({ pokemonMapId }) => {
  const [menu, setMenu] = useState({
    isOpen: false,
    imageX: 0,
    imageY: 0,
    menuX: 0,
    menuY: 0,
  });

  const [map, setMap] = useState({
    map: null,
    pokemonToFind: [],
  });

  const initMap = () => {
    let selectedMap;
    const localPokemonForMap3 = [
      "Pichu",
      "Persian",
      "Magnemite",
      "Espeon",
      "Remoraid",
    ];
    if (pokemonMapId === 1) {
      selectedMap = pokemonMap1;
    } else if (pokemonMapId === 2) {
      selectedMap = pokemonMap2;
    } else if (pokemonMapId === 3) {
      selectedMap = pokemonMap3;
    } else {
      console.log("Invalid Map ID");
    }

    setMap({
      map: selectedMap,
      pokemonToFind: localPokemonForMap3,
    });
  };

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
    if (menu.isOpen) {
      return (
        <div
          style={{ top: menu.menuY, left: menu.menuX, position: "absolute" }}
          id="menu"
          onDoubleClick={closeMenu}
          data-testid="menu"
        >
          <div>Pichu</div>
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
      <img src={pokemonMap3} alt="pokemon-map" id="pokemon-map" />
    </div>
  );
};

export default PokemonMap;
