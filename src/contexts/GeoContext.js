import React, { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
import ACTIONS from "./actions/geoActions";
import geoRuducer from "./reducers/GeoReducer";
export const GeoContext = createContext();

const DEFAULT_LAT = -27.46977;
const DEFAULT_LNG = 153.025131;
const DEFAULT_COUNTRY = "Australia";
const DEFAULT_PROVINCE = "Queensland";

export default function GeoContextProvider({ children }) {
  const [geoState, geoDispatch] = useReducer(geoRuducer, {
    dataLoading: false,
    covidStat: {},
    coordinates: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
    countryInfo: {
      country: DEFAULT_COUNTRY,
      province: DEFAULT_PROVINCE,
    },
  });

  useEffect(() => {
    const getCovidStat = async () => {
      const { country, province } = geoState.countryInfo;
      geoDispatch({ type: ACTIONS.SET_DATA_LOADING });
      try {
        const response = await axios.get(
          `http://localhost:3001/statistic/${country}/${
            province === "" ? "general" : province
          }`
        );
        const statisticObject = response.data.data;
        console.log(statisticObject);
        if (Object.keys(statisticObject).length !== 0) {
          geoDispatch({
            type: ACTIONS.SET_COVID19_STAT,
            payload: statisticObject,
          });
          geoDispatch({ type: ACTIONS.SET_DATA_LOADING });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCovidStat();
  }, [geoState.countryInfo]);

  return (
    <GeoContext.Provider
      value={{
        ...geoState,
        geoDispatch,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
}
