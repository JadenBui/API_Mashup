import React from "react";
import LeafletMap from "./Components/LeafletMap/LeafletMap";
import GeoContextProvider from "./contexts/GeoContextProvider";
const App = () => {
  return (
    <div className="leaflet-map">
      <GeoContextProvider>
        <LeafletMap />
      </GeoContextProvider>
    </div>
  );
};

export default App;
