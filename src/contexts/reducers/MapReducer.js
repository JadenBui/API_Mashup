import ACTIONS from "../actions/mapActions";

export default (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case ACTIONS.SET_ZOOM:
      return { ...state, zoom: payload };

    case ACTIONS.SET_USER_COORDINATES:
      return {
        ...state,
        userCoordinates: { lat: payload.lat, lng: payload.lng },
      };

    case ACTIONS.SET_SHOW_USER_LOCATION:
      return {
        ...state,
        showUserLocation: !state.showUserLocation,
      };
  }
};
