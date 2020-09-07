import React, { useEffect, Fragment, useContext } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { geolocated } from "react-geolocated";
import { Card, Row, Typography } from "antd";
import { GeoContext } from "../../contexts/GeoContext";
import { MapContext } from "../../contexts/MapContext";
import {
  LoadingOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import ACTIONS from "../../contexts/actions/mapActions";

const { Text, Link } = Typography;
const iconLinks = ["info.png", "location.png"];
const icons = Array.from({ length: 2 }).map(
  (_, index) =>
    new Icon({
      iconUrl: iconLinks[index],
      iconSize: [30, 30],
    })
);

const photoIcon = new Icon({
  iconUrl: "photo.png",
  iconSize: [35, 35],
});

const LeafletMap = ({ coords }) => {
  const { zoom, showUserLocation, mapDispatch } = useContext(MapContext);
  const {
    coordinates,
    covidStat,
    countryInfo,
    dataLoading,
    photos,
  } = useContext(GeoContext);
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
        {photos.map((photo) => {
          return (
            <Marker
              position={[photo.latitude, photo.longitude]}
              icon={photoIcon}
              key={photo.id}
            >
              <Popup className="photo-info-popup">
                <Card
                  className="map-photo-card"
                  cover={
                    <img className="map-photo" alt="unsplash" src={photo.url} />
                  }
                >
                  <div className="map-photo-card__body">
                    <Row
                      align="middle"
                      justify="center"
                      style={{ marginBottom: "1em" }}
                    >
                      <Text code type="danger">
                        {photo.description
                          ? photo.description.length > 30
                            ? photo.description.slice(0, 30) + "..."
                            : photo.description
                          : photo.userName}
                      </Text>
                    </Row>
                    <Row align="middle">
                      <img
                        className="map-photo-card__avatar"
                        src={photo.avatar}
                      />
                      <Text code>{photo.userName}</Text>
                    </Row>
                    {photo.instagram && (
                      <Row align="middle" style={{ margin: ".5em 0" }}>
                        <InstagramOutlined />
                        <Link
                          code
                          href={`https://www.instagram.com/${photo.instagram}/?hl=en`}
                          target="_blank"
                        >
                          {photo.instagram}
                        </Link>
                      </Row>
                    )}
                    {photo.twitter && (
                      <Row align="middle">
                        <TwitterOutlined />
                        <Link
                          code
                          href={`https://twitter.com/${photo.twitter}`}
                          target="_blank"
                        >
                          {photo.twitter}
                        </Link>
                      </Row>
                    )}
                  </div>
                </Card>
              </Popup>
            </Marker>
          );
        })}
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
