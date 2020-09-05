import React, { useState, Fragment, useContext } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { geolocated } from "react-geolocated";
import { Card, Row, Typography } from "antd";
import { GeoContext } from "../../contexts/GeoContext";
import { MapContext } from "../../contexts/MapContext";

const { Text } = Typography;
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
  const { zoom, showUserLocation } = useContext(MapContext);
  const { lat, lng, covidStat, country, province } = useContext(GeoContext);
  const position = [lat, lng];
  const userPosition = coords && [coords.latitude, coords.longitude];

  return (
    <Fragment>
      <Map
        center={coords && showUserLocation ? userPosition : position}
        zoom={zoom}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={icons[0]}>
          <Popup>
            <Card
              title={
                <Fragment>
                  <Row>
                    <Text code type="danger">
                      COVID-19 STATISTIC
                    </Text>
                  </Row>
                  <Row>
                    <Text code style={{ color: "#1890ff" }}>
                      {country
                        ? `of ${country.toUpperCase()} (${province})`
                        : null}
                    </Text>
                  </Row>
                </Fragment>
              }
              style={{ textAlign: "center" }}
              bordered={false}
              hoverable={true}
            >
              {Object.keys(covidStat).map((stat) => {
                return (
                  <Row>
                    <Text keyboard>
                      {stat} Cases: {covidStat[stat]}
                    </Text>
                  </Row>
                );
              })}
            </Card>
          </Popup>
        </Marker>
        {coords && showUserLocation ? (
          <Marker
            position={[coords.latitude, coords.longitude]}
            icon={icons[1]}
          >
            <Popup>You're here</Popup>
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
