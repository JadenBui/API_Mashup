import React, { useContext } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Button } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { MapContext } from "../../contexts/MapContext";

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
    </div>
  );
}
