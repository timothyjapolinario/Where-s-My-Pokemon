const PreviewMenu = ({ previewMenuState, togglePrevMenu, pokemonList }) => {
  return (
    <div
      className={`map-preview-menu ${
        previewMenuState ? "slide-up" : "slide-down"
      }`}
      onClick={togglePrevMenu}
    >
      {pokemonList.map((pokemon) => {
        return <div key={pokemon.name}>{pokemon.name}</div>;
      })}
    </div>
  );
};

export default PreviewMenu;
