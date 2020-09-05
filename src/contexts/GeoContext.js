import React, { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
import ACTIONS from "./actions";
export const GeoContext = createContext();

const DEFAULT_LAT = -27.46977;
const DEFAULT_LNG = 153.025131;
const DEFAULT_COUNTRY = "Australia";
const DEFAULT_PROVINCE = "Queensland";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case ACTIONS.SET_GEO_LOCATION:
      return { ...state, lat: payload.lat, lng: payload.lng };

    case ACTIONS.SET_COUNTRY_INFORMATION:
      return { ...state, country: payload.country, province: payload.province };

    case ACTIONS.SET_COVID19_STAT:
      return { ...state, covidStat: payload };
  }
};

export default function GeoContextProvider({ children }) {
  const [geoState, dispatch] = useReducer(reducer, {
    covidStat: {},
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    country: DEFAULT_COUNTRY,
    province: DEFAULT_PROVINCE,
  });

  useEffect(() => {
    const getCovidStat = async () => {
      const { country, province } = geoState;
      const response = await axios.get(
        `http://localhost:3001/statistic/${country}/${province}`
      );
      const statisticObject = response.data.data;
      dispatch({ type: ACTIONS.SET_COVID19_STAT, payload: statisticObject });
    };
    getCovidStat();
  }, [geoState.province]);

  return (
    <GeoContext.Provider
      value={{
        ...geoState,
        dispatch,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
}
