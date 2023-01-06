const PreviewMenu = ({ previewMenuState, togglePrevMenu, pokemonList }) => {
  console.log(pokemonList);
  return (
    <div
      className={`map-preview-menu ${
        previewMenuState ? "slide-up" : "slide-down"
      }`}
      onClick={togglePrevMenu}
    >
      {pokemonList &&
        pokemonList.map((pokemon) => {
          return <div key={pokemon.name}>{pokemon.name}</div>;
        })}
    </div>
  );
};

export default PreviewMenu;
