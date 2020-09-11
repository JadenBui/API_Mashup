import React, { useContext } from "react";
import { Button } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { MapContext } from "../../contexts/MapContext";
import NewsSection from "../NewsSection/NewsSection";
import TwitterSection from "../TwitterSection/TwitterSection";
import SearchBar from "../SearchBar/LocationSearchByInput";

export default function ControlBoard() {
  const { onShowUserLocation, showUserLocation, userCoordinates } = useContext(
    MapContext
  );
  return (
    <div className="map-controller">
      <div className="map-controller__user-location-btn">
        <Button
          type={showUserLocation ? "danger" : "primary"}
          disabled={!userCoordinates}
          onClick={onShowUserLocation}
        >
          <AimOutlined />
          {showUserLocation ? "Hide My Location" : "My Location"}
        </Button>
      </div>
      <SearchBar />
      <NewsSection />
      <TwitterSection />
    </div>
  );
}
