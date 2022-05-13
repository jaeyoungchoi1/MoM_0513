import React, { useState } from "react";

import MediaCard from "./Card";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import image from "../image/heartMarker_20x32.png";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

/*
displayMarkers = () => {
  return this.state.stores.map((store, index) => {
    return <Marker key = {index} id = {index} position = label = {store.title} />
  })
}*/

export class MapContainer extends React.Component {
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

  render() {
    const places = this.props.places;
    const markers = places.map((place) => (
      <Marker
        name={place.name}
        position={place.position}
        key={place.id}
        onClick={(e) => {
          this.props.onClick(e, place);
        }}
        icon={image}
      />
    ));
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: 37.5,
          lng: 127
        }}
        disableDefaultUI={true}
        fullscreenControl={false}
      >
        {
          //<Marker onClick={this.onMarkerClick} name={"Current location"} />
        }
        {markers}
        <InfoWindow visible={true} position={this.props.selectedItem.position}>
          <div>
            <h1>{this.props.selectedItem.name}</h1>
            <MediaCard sx={{ width: 50 }} />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBU-hDVtV5lNXc4jsnr0AIaUAUcMylVhpY",
  language: "ko",
  region: "KR"
})(MapContainer);
