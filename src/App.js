import React, { Component, useEffect, useState } from "react";
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
  const [selectedDday, setSelectedDday] = useState(0);
  const [selectedDate, setSelectedDate] = useState();
  const [infoWindow, setInfoWindow] = useState(false);
  const fireData = firestore.collection("places");

  const dateToStr = (date) => {
    var week = new Array('일', '월', '화', '수', '목', '금', '토');
  
    var localTime = date.toLocaleTimeString();
  
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dayName = week[date.getDay()];
  
    return year+'년 '+month+'월 '+day+'일 '+dayName+'요일 '+localTime.substring(0,5);
  }

  const showInfo = (e, selectedItem) => {
    setInfoWindow(true);
    setSelectedItem(selectedItem);

    setSelectedDday(Math.ceil((selectedItem.date.seconds-1644246000)/(60*60*24)));
    //const gap = selectedItem.date.getTime() - Dday.getTime();
    
    //console.log(Math.floor(gap / (1000 * 60 * 60 * 24)) * -1);
    console.log(Math.ceil((selectedItem.date.seconds-1644246000)/(60*60*24)));
  };

  useEffect(() => {
    fireData.onSnapshot((snapshot) => {
      setInfos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          position: doc.data().position,
          imgUrl: doc.data().imgUrl,
          date: doc.data().date,
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
        dDay={selectedDday}
        date={selectedDate}
      />
    </div>
  );
};

export default App;
