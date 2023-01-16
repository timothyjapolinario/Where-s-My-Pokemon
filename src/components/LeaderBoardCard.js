import "./LeaderBoardCard.css";
const LeaderBoardCard = ({ leaderBoardArr, mapImgUrl, mapId }) => {
  return (
    <div className="LeaderBoardCard">
      <div className="leader-board-users">
        {leaderBoardArr.map((user, index) => {
          return (
            <div className="leader-board-user" key={user.name + "-score"}>
              <div>{index + 1}</div>
              <div>{user.name}</div>
              <div>{user[`map${mapId}Time`]}</div>
            </div>
          );
        })}
      </div>
      <img src={mapImgUrl} alt="map-img-lb" className="map-img-lb" />
    </div>
  );
};

export default LeaderBoardCard;
