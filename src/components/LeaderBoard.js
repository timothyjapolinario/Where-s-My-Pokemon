import "./LeaderBoard.css";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../modules/AppFirebase";
import LeaderBoardCard from "./LeaderBoardCard";
import LoadingScreen from "./LoadingScreen";

const sortByTime = (mapId, userArr = []) => {
  const prop = `map${mapId}Time`;
  return userArr.sort((a, b) => {
    const [aMin, aSec] = a[prop].split(" : ");
    const [bMin, bSec] = b[prop].split(" : ");
    const aMinToSec = parseInt(aMin) * 60 + parseInt(aSec);
    const bMinToSec = parseInt(bMin) * 60 + parseInt(bSec);
    return aMinToSec - bMinToSec;
  });
};
const fetchAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const allUsers = [];
  querySnapshot.forEach((doc) => {
    allUsers.push(doc.data());
  });
  return allUsers;
};

const getAllMapTime = (mapId, userArr) => {
  return userArr.filter((user) => {
    const prop = `map${mapId}Time`;
    if (user[prop]) {
      return true;
    } else {
      return false;
    }
  });
};

const createLeaderBoard = (mapId, userArr) => {
  const filteredUser = getAllMapTime(mapId, userArr);
  const timeSorted = sortByTime(mapId, filteredUser);

  return timeSorted;
};

const LeaderBoard = ({ maps }) => {
  const [isLoading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [leaderBoard, setLeaderBoard] = useState([...maps]);
  useEffect(() => {
    fetchAllUsers().then((allUsers) => {
      setAllUsers(allUsers);
    });
    setLeaderBoard([...maps]);
  }, [maps]);

  useEffect(() => {
    console.log(leaderBoard.length);
    const mapsWithLeaderBoard = leaderBoard.map((mapObj) => {
      return {
        ...mapObj,
        leaderBoard: createLeaderBoard(mapObj.mapId, allUsers),
      };
    });

    setLeaderBoard(mapsWithLeaderBoard);
    if (mapsWithLeaderBoard.length > 0) {
      setLoading(false);
    }
  }, [allUsers]);
  useEffect(() => {
    console.log(leaderBoard);
  }, [leaderBoard]);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="leader-board-list">
        {leaderBoard.map((mapObj) => {
          return (
            <LeaderBoardCard
              leaderBoardArr={mapObj.leaderBoard}
              mapImgUrl={mapObj.imageURL}
              mapId={mapObj.mapId}
            />
          );
        })}
      </div>
    );
  }
};

export default LeaderBoard;
