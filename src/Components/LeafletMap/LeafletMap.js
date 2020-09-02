import React, { useState, Fragment } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { geolocated } from "react-geolocated";
import { Button } from "antd";

const DEFAULT_LAT = -27.46977;
const DEFAULT_LNG = 153.025131;

const iconLinks = ["info.png", "location.png"];
const icons = Array.from({ length: 2 }).map(
  (_, index) =>
    new Icon({
      iconUrl: iconLinks[index],
      iconSize: [25, 25],
    })
);

const userIcon = new Icon({
  iconUrl: "location.png",
  iconSize: [25, 25],
});

const LeafletMap = ({ coords }) => {
  const [zoom, setZoom] = useState(13);
  const [showUserPosition, setShowUserPosition] = useState(false);
  const position = [DEFAULT_LAT, DEFAULT_LNG];
  const userPosition = coords && [coords.latitude, coords.longitude];
  const onMyLocationClick = () => {
    if (coords) {
      setShowUserPosition((prev) => !prev);
      setZoom(showUserPosition ? 13 : 17);
    }
  };
  return (
    <Fragment>
      <Button
        type={showUserPosition ? "danger" : "primary"}
        onClick={onMyLocationClick}
      >
        {showUserPosition ? "Hide My Location" : "My Location"}
      </Button>
      <Map
        center={coords && showUserPosition ? userPosition : position}
        zoom={zoom}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={icons[0]}>
          <Popup>Covid-19 stats</Popup>
        </Marker>
        {coords && showUserPosition ? (
          <Marker
            position={[coords.latitude, coords.longitude]}
            icon={icons[1]}
          >
            <Popup>You are here</Popup>
          </Marker>
        ) : null}
      </Map>
    </Fragment>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 10000,
})(LeafletMap);
