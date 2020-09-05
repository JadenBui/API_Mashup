import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const GeoContext = createContext();

const DEFAULT_LAT = -27.46977;
const DEFAULT_LNG = 153.025131;

export default function GeoContextProvider({ children }) {
  const [geoStat, setGeoStat] = useState({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  const [locationInfo, setLocationInfo] = useState({
    country: "Australia",
    province: "Queensland",
  });
  const [covidStat, setCovidStat] = useState([]);
  useEffect(() => {
    const getCovidStat = async () => {
      const { country, province } = locationInfo;
      const response = await axios.get(
        `http://localhost:3001/statistic/${country}/${province}`
      );
      const statisticObject = response.data.data;
      setCovidStat(statisticObject);
    };
    getCovidStat();
  }, [geoStat]);
  const setCoordinates = (coordinates) => {
    setGeoStat(coordinates);
  };

  return (
    <GeoContext.Provider
      value={{
        geoStat,
        setCoordinates,
        covidStat,
        locationInfo,
        setLocationInfo,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
}
