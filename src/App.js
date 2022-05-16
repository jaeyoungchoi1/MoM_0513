import React, { Component, useEffect, useState } from "react";
import "./styles.css";
import BottomDrawer from "./components/BottomDrawer";
import Maps from "./components/Maps";
import places from "./Places";
import { firestore } from "./firebase";

React.useLayoutEffect = React.useEffect;

const App = () => {
  const [infos, setInfos] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    position: { latitude: 0, longitude: 0 },
  });
  const [infoWindow, setInfoWindow] = useState(false);
  const fireData = firestore.collection("places");

  const showInfo = (e, selectedItem) => {
    setInfoWindow(true);
    setSelectedItem(selectedItem);
    console.log(selectedItem);
  };

  useEffect(() => {
    fireData.onSnapshot((snapshot) => {
      setInfos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          position: doc.data().position,
          imgUrl: doc.data().imgUrl,
        }))
      );
    });
  }, []);

  return (
    <div className="App">
      <BottomDrawer infos={infos} places={places} onClick={showInfo} />
      <Maps
        infos={infos}
        places={places}
        selectedItem={selectedItem}
        onClick={showInfo}
        infoWindow={infoWindow}
      />
    </div>
  );
};

export default App;
