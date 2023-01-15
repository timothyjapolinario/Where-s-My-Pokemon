import { map } from "@firebase/util";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../modules/AppFirebase";

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
  //console.log(maps);
  const [allUsers, setAllUsers] = useState([]);
  const [leaderBoard, setLeaderBoard] = useState({
    mapOne: [],
    mapTwo: [],
    mapThree: [],
  });
  useEffect(() => {
    fetchAllUsers().then((allUsers) => {
      setAllUsers(allUsers);
    });
  }, []);

  useEffect(() => {
    setLeaderBoard({
      mapOne: createLeaderBoard(1, allUsers),
      mapTwo: createLeaderBoard(2, allUsers),
      mapThree: createLeaderBoard(3, allUsers),
    });
  }, [allUsers]);
  useEffect(() => {
    //console.log(leaderBoard);
  }, [leaderBoard]);

  return <div></div>;
};

export default LeaderBoard;
