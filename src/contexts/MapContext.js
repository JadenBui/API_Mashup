import React, { createContext, useReducer } from "react";
import ACTIONS from "./actions/mapActions";
import mapReducer from "./reducers/MapReducer";
export const MapContext = createContext();

export default function MapContextProvider({ children }) {
  const [mapState, mapDispatch] = useReducer(mapReducer, {
    zoom: 13,
    showUserLocation: false,
    userCoordinates: null,
  });

  const onShowUserLocation = () => {
    mapDispatch({
      type: ACTIONS.SET_ZOOM,
      payload: mapState.showUserLocation ? 13 : 17,
    });
    mapDispatch({ type: ACTIONS.SET_SHOW_USER_LOCATION });
  };
  return (
    <MapContext.Provider
      value={{ ...mapState, onShowUserLocation, mapDispatch }}
    >
      {children}
    </MapContext.Provider>
  );
}
