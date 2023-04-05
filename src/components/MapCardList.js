import MapCard from "./MapCard";

const MapCardList = ({ maps, selectMap }) => {
  return (
    <div className="map-preview-list">
      {maps.map((map) => {
        return (
          <MapCard
            key={`map${map.mapId}`}
            mapId={map.mapId}
            mapImage={map.imageURL}
            pokemonList={map.pokemonObjs}
            selectMap={selectMap}
          />
        );
      })}
    </div>
  );
};

export default MapCardList;
