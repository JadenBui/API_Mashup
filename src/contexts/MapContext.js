import React, { createContext, useState, useEffect } from "react";
export const MapContext = createContext();

export default function MapContextProvider({ children }) {
  const [mapInfo, setMapInfo] = useState({
    zoom: 13,
    showUserLocation: false,
  });

  const onShowUserLocation = () => {
    setMapInfo((prev) => {
      const prevShowUserLocation = prev.showUserLocation;
      return {
        ...prev,
        zoom: prevShowUserLocation ? 13 : 17,
        showUserLocation: !prevShowUserLocation,
      };
    });
  };
  return (
    <MapContext.Provider value={{ ...mapInfo, onShowUserLocation }}>
      {children}
    </MapContext.Provider>
  );
}
