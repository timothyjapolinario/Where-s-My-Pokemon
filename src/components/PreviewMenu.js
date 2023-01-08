import { Link } from "react-router-dom";

const PreviewMenu = ({
  previewMenuState,
  togglePrevMenu,
  pokemonList,
  mapId,
}) => {
  return (
    <div
      className={`map-preview-menu ${
        !previewMenuState ? "slide-up" : "slide-down"
      }`}
      onClick={togglePrevMenu}
    >
      {pokemonList &&
        pokemonList.map((pokemon) => {
          return <div key={pokemon.name}>{pokemon.name}</div>;
        })}
      <Link to={`game/${mapId}`}>
        <div>Select Map!</div>
      </Link>
    </div>
  );
};

export default PreviewMenu;
