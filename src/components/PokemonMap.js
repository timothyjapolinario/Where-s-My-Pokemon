import { useState } from "react";
import pokemonMap from "../pokemon-maps/03.jpg";
import "./PokemonMap.css";
const PokemonMap = () => {
  const [menu, setMenu] = useState({
    isOpen: false,
  });
  const closeMenu = () => {
    setMenu({
      ...menu,
      isOpen: false,
    });
  };
  const renderMenu = () => {
    if (menu.isOpen) {
      return (
        <div id="menu" onDoubleClick={closeMenu} data-testid="menu">
          <div>Pichu</div>
        </div>
      );
    }
  };

  const openMenu = () => {
    setMenu({
      ...menu,
      isOpen: true,
    });
  };

  return (
    <div data-testid="pokemon-map" onClick={openMenu}>
      <div>{renderMenu()}</div>
      <img src={pokemonMap} alt="pokemon-map" id="pokemon-map" />
    </div>
  );
};

export default PokemonMap;
