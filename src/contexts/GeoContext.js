import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import ACTIONS from "./actions/geoActions";
import geoRuducer from "./reducers/GeoReducer";
import { message } from "antd";
export const GeoContext = createContext();

const DEFAULT_LAT = -27.46977;
const DEFAULT_LNG = 153.025131;
const DEFAULT_COUNTRY = "Australia";
const DEFAULT_PROVINCE = "Queensland";
const DEFAULT_LOCALITY = "Brisbane";

export default function GeoContextProvider({ children }) {
  const [geoState, geoDispatch] = useReducer(geoRuducer, {
    dataLoading: false,
    covidStat: {},
    photos: [],
    coordinates: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
    countryInfo: {
      country: DEFAULT_COUNTRY,
      province: DEFAULT_PROVINCE,
      locality: DEFAULT_LOCALITY,
    },
    news: null,
    tweets: null,
  });

  useEffect(() => {
    const getCovidStat = async () => {
      const { country, province } = geoState.countryInfo;
      geoDispatch({ type: ACTIONS.SET_DATA_LOADING });
      try {
        const response = await axios.get(
          `http://localhost:3001/statistic/${country}/${province}`
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
        message.error(error.message);
      }
    };
    const getPhotos = async () => {
      try {
        const photoResponse = await axios.get(
          `http://localhost:3001/photos/${geoState.countryInfo.locality}?lat=${geoState.coordinates.lat}&lng=${geoState.coordinates.lng}`
        );
        geoDispatch({
          type: ACTIONS.SET_PHOTOS,
          payload: photoResponse.data.data,
        });
      } catch (error) {
        message.error(error.message);
      }
    };
    const getNews = async () => {
      try {
        const { province } = geoState.countryInfo;
        geoDispatch({ type: ACTIONS.SET_DATA_LOADING });
        console.log(province);
        const newsResponse = await axios.get(
          `http://localhost:3001/news/${province}`
        );
        geoDispatch({ type: ACTIONS.SET_DATA_LOADING });
        geoDispatch({
          type: ACTIONS.SET_NEWS,
          payload: newsResponse.data.data,
        });
      } catch (error) {
        message.error(error.message);
      }
    };
    const getTweets = async () => {
      try {
        const { lat, lng } = geoState.coordinates;
        console.log(lat, lng);
        geoDispatch({ type: ACTIONS.SET_DATA_LOADING });
        const tweetsResponse = await axios.get(
          `http://localhost:3001/tweets?lat=${lat}&lng=${lng}`
        );
        geoDispatch({ type: ACTIONS.SET_DATA_LOADING });
        geoDispatch({
          type: ACTIONS.SET_TWEETS,
          payload: tweetsResponse.data.data,
        });
      } catch (error) {
        message.error(error.message);
      }
    };
    //getCovidStat();
    //getPhotos();
    //getNews();
    //getTweets();
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
