import React, { useEffect, Fragment, useContext } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { geolocated } from "react-geolocated";
import { Card, Row, Typography } from "antd";
import { GeoContext } from "../../contexts/GeoContext";
import { MapContext } from "../../contexts/MapContext";
import { LoadingOutlined } from "@ant-design/icons";
import ACTIONS from "../../contexts/actions/mapActions";

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
  const { zoom, showUserLocation, mapDispatch } = useContext(MapContext);
  const { coordinates, covidStat, countryInfo, dataLoading } = useContext(
    GeoContext
  );
  const position = [coordinates.lat, coordinates.lng];
  const userPosition = coords && [coords.latitude, coords.longitude];

  useEffect(() => {
    if (coords) {
      mapDispatch({ type: ACTIONS.SET_USER_COORDINATES, payload: coords });
    }
  }, [coords]);

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
                      {countryInfo
                        ? `of ${countryInfo.country.toUpperCase()} (${
                            countryInfo.province === ""
                              ? "General"
                              : countryInfo.province
                          })`
                        : null}
                    </Text>
                  </Row>
                </Fragment>
              }
              style={{ textAlign: "center" }}
              bordered={false}
              hoverable={true}
            >
              {dataLoading ? (
                <LoadingOutlined className="map-icon" />
              ) : (
                Object.keys(covidStat).map((stat, index) => {
                  return (
                    <Row key={index}>
                      <Text keyboard>
                        {stat} Cases: {covidStat[stat]}
                      </Text>
                    </Row>
                  );
                })
              )}
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
