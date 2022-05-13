import React, { Component, useEffect, useState } from "react";
import "./styles.css";
import BottomDrawer from "./components/BottomDrawer";
import Maps from "./components/Maps";
import places from "./Places";
import { firestore } from "./firebase";

function App() {
  const [infos, setInfos] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ lat: 0, lng: 0 });

  const showInfo = (e, selectedItem) => {
    setSelectedItem({ selectedItem: selectedItem });
    console.log(selectedItem);
  };

  useEffect(() => {
    const fireData = firestore.collection("places");
    fireData.onSnapshot((snapshot) => {
      setInfos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          location: doc.data().location,
        }))
      );
    });
  });

  return (
    <div className="App">
      <BottomDrawer infos={infos} places={places} onClick={showInfo.bind(this)} />
      <Maps
        places={places}
        selectedItem={selectedItem}
        onClick={showInfo.bind(this)}
      />
    </div>
  );
}

export default App;
