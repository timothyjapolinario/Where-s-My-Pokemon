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
        !previewMenuState ? "scale-zero" : "scale-full"
      }`}
      onClick={togglePrevMenu}
    >
      {pokemonList &&
        pokemonList.map((pokemon) => {
          return (
            <div key={pokemon.name} className="preview-pokemon-info">
              <div>{pokemon.name}</div>
              <img src={pokemon.imageUrl} class="preview-pokemon-image" />
            </div>
          );
        })}
      <div className="select-map-button">
        <Link to={`game/${mapId}`}>Select Map!</Link>
      </div>
    </div>
  );
};

export default PreviewMenu;
