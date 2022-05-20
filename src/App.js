import React, { useEffect, useState } from "react";
import "./styles.css";
import BottomDrawer from "./components/BottomDrawer";
import Maps from "./components/Maps";
import { firestore } from "./firebase";

React.useLayoutEffect = React.useEffect;

const App = () => {
  const [infos, setInfos] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    position: { latitude: 0, longitude: 0 },
  });
  const [infoWindow, setInfoWindow] = useState(false);
  const fireData = firestore.collection("places");

  const dts = (date) => {
    var moment = require("moment");
    const dateString = moment(date.toDate()).format("ll");

    return dateString;
  };

  const showInfo = (e, selectedItem) => {
    setInfoWindow(true);
    setSelectedItem(selectedItem);

    console.log(selectedItem.date.seconds);
    console.log(
      Math.ceil((selectedItem.date.seconds - 1644246000) / (60 * 60 * 24))
    );
  };

  useEffect(() => {
    fireData.orderBy("date").onSnapshot((snapshot) => {
      setInfos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          position: doc.data().position,
          imgUrl: doc.data().imgUrl,
          date: doc.data().date,
          dDay: Math.ceil(
            (doc.data().date.seconds - 1644246000) / (60 * 60 * 24)
          ),
          toDate: dts(doc.data().date),
          placeName: doc.data().placeName,
        }))
      );
    });
  }, []);

  return (
    <div className="App">
      <BottomDrawer infos={infos} onClick={showInfo} />
      <Maps
        infos={infos}
        selectedItem={selectedItem}
        onClick={showInfo}
        infoWindow={infoWindow}
      />
    </div>
  );
};

export default App;
