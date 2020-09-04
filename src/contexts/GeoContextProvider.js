import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const GeoContext = createContext();

const DEFAULT_LAT = -27.46977;
const DEFAULT_LNG = 153.025131;

export default function GeoContextProvider(props) {
  const [geoStat, setGeoStat] = useState({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  const [province, setProvince] = useState();
  const [country, setCountry] = useState();
  const [covidStat, setCovidStat] = useState({});
  useEffect(() => {
    const getCovidStat = async () => {
      const result = await axios.get(
        `localhost:3001/statistic/${country}/${province}`
      );
      setCovidStat(result);
    };
    getCovidStat();
  }, [geoStat]);
  const setCoordinates = (coordinates) => {
    setGeoStat(coordinates);
  };

  return (
    <GeoContext.Provider value={{ geoStat, setCoordinates }}>
      {props.children}
    </GeoContext.Provider>
  );
}
