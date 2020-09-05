import React from "react";
import LeafletMap from "./Components/LeafletMap/LeafletMap";
import GeoContextProvider from "./contexts/GeoContext";
import MapContextProvider from "./contexts/MapContext";
import ControlBoard from "./Components/ControlBoard/ControlBoard";
const App = () => {
  return (
    <div className="leaflet-map">
      <GeoContextProvider>
        <MapContextProvider>
          <LeafletMap />
          <ControlBoard />
        </MapContextProvider>
      </GeoContextProvider>
    </div>
  );
};

export default App;
