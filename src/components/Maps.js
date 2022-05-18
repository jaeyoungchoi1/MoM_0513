import React, { useState, useEffect } from "react";

import MediaCard from "./Card";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import image from "../image/heartMarker_20x32.png";
import { firestore } from "../firebase";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

/*
displayMarkers = () => {
  return this.state.stores.map((store, index) => {
    return <Marker key = {index} id = {index} position = label = {store.title} />
  })
}*/

const MapContainer = (props) => {
  /*
  addMarker() {
    const places = this.props.places;
    const markers = places.map((place) => {
      return new Marker({
        position: place.position,
        icon:{image},
        key:place.id,
        onClick:(e) => {
          this.props.onClick(e, place);
        }
      });
    });
    // Add a marker clusterer to manage the markers.
    new MarkerClusterer(this.state.map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
    });
  }*/

  /*const places = props.places;
    const markers = places.map((place) => (
      <Marker
        name={place.name}
        position={place.position}
        key={place.id}
        onClick={(e) => {
          props.onClick(e, place);
        }}
        icon={image}
      />
    ));*/
  const infos = props.infos;
  const selectedItem = props.selectedItem;
  const infoMarkers = infos.map((info) => (
    <Marker
      name={info.name}
      position={{ lat: info.position.latitude, lng: info.position.longitude }}
      key={info.id}
      onClick={(e) => {
        props.onClick(e, info);
      }}
      icon={image}
    />
  ));


  const [initLat, setInitLat] = useState(37.5);
  const [initLng, setInitLng] = useState(127);

  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        setInitLat(position.coords.latitude);
        setInitLng(position.coords.longitude);
        console.log("lat: " + position.coords.latitude);
        console.log("lng: " + position.coords.longitude);
      });
    }
    else{
      console.log("Geolocation is not supported by this browser");
    }
  },[]);

  return (
    
    <Map
      google={props.google}
      zoom={13}
      initialCenter={{
        lat: initLat,
        lng: initLng,
      }}
      center={{
        lat: initLat,
        lng: initLng,
      }}
      disableDefaultUI={true}
      fullscreenControl={false}
    >
      {
        //<Marker onClick={this.onMarkerClick} name={"Current location"} />
      }
      {/*markers*/}
      {infoMarkers}
      <InfoWindow
        visible={props.infoWindow}
        position={{
          lat: selectedItem.position.latitude,
          lng: selectedItem.position.longitude,
        }}
      >
        <div>
          <MediaCard  selectedItem={selectedItem} imgUrl={selectedItem.imgUrl} 
          dDay={props.dDay} date={props.date}
          />
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBU-hDVtV5lNXc4jsnr0AIaUAUcMylVhpY",
  language: "ko",
  region: "KR",
})(MapContainer);
