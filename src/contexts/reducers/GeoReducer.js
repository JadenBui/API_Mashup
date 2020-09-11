import ACTIONS from "../actions/geoActions";

export default (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case ACTIONS.SET_DATA_LOADING:
      return { ...state, dataLoading: !state.dataLoading };

    case ACTIONS.SET_GEO_LOCATION:
      return { ...state, coordinates: { lat: payload.lat, lng: payload.lng } };

    case ACTIONS.SET_PHOTOS:
      return { ...state, photos: payload };

    case ACTIONS.SET_COUNTRY_INFORMATION:
      return {
        ...state,
        countryInfo: {
          country: payload.country,
          province: payload.province,
          locality: payload.locality,
        },
      };

    case ACTIONS.SET_COVID19_STAT:
      return { ...state, covidStat: payload };

    case ACTIONS.SET_NEWS:
      return { ...state, news: payload };

    case ACTIONS.SET_TWEETS:
      return { ...state, tweets: payload };
  }
};
