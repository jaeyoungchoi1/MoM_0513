import { Marker } from "google-maps-react";
import React, { useState, useEffect } from "react";
import { placeList } from "./Places";

function Place({ place }) {
  return (
    <div>
      <Marker name={place.name} position={place.position} />
    </div>
  );
}

const PlaceList = () => {
  return (
    <>
      {placeList.map((place) => (
        <Place place={place} />
      ))}
    </>
  );
};

export default PlaceList;
