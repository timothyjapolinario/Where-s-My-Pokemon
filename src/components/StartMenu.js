const StartMenu = ({ maps, poke }) => {
  console.log(maps);
  const MapCard = (mapName, mapImage, pokemonList) => {
    return (
      <div>
        <div>{mapName}</div>
        <div>
          <img src={mapImage} alt="pokemonMap-preview" />
        </div>
        <div>
          {pokemonList.map((pokemon) => {
            return <div>{pokemon.name}</div>;
          })}
        </div>
      </div>
    );
  };
  return (
    <div>
      {maps.map((map) => {
        return MapCard(map.mapId, map.imageURL, map.pokemons);
      })}
    </div>
  );
};

export default StartMenu;
