import ACTIONS from "../actions/mapActions";

export default (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case ACTIONS.SET_ZOOM:
      return { ...state, zoom: payload };

    case ACTIONS.SET_USER_COORDINATES:
      return {
        ...state,
        userCoordinates: { lat: payload.latitude, lng: payload.longitude },
      };

    case ACTIONS.SET_SHOW_USER_LOCATION:
      return {
        ...state,
        showUserLocation: !state.showUserLocation,
      };

    case ACTIONS.SET_NEWS:
      return {
        ...state,
        news: payload,
      };
  }
};
