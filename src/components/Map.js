import React from "react";
import GoogleMap from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component {
  render() {
    return (
      <div className="map" style={{ height: "100vh", width: "100%" }}>
        <GoogleMap
          bootstrapURLKeys={{ key: "AIzaSyBU-hDVtV5lNXc4jsnr0AIaUAUcMylVhpY" }}
          defaultCenter={{ lat: 37.5, lng: 127 }}
          defaultZoom={15}
        >
          <AnyReactComponent lat={37.5} lng={127} text="My Marker" />
        </GoogleMap>
      </div>
    );
  }
}

export default Map;
