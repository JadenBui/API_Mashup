import { Input, Button } from "antd";
import React, { useState, Fragment, useContext } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { GeoContext } from "../../contexts/GeoContext";
import axios from "axios";
import ACTIONS from "../../contexts/actions";
import { SearchOutlined } from "@ant-design/icons";

const LocationSearchByInput = () => {
  const [stateAddress, setAddress] = useState("");
  const onAddressChange = (address) => {
    setAddress(address);
  };
  const { dispatch } = useContext(GeoContext);

  const onAddressSelect = async (address) => {
    const fomarttedAddress = encodeURI(address);
    const coordinateResponse = await axios.get(
      `http://localhost:3001/geo/address/${fomarttedAddress}`
    );
    const coordinateResult = coordinateResponse.data.data.results[0];
    const coordinates = coordinateResult.geometry.location;
    const locationResponse = await axios.get(
      `http://localhost:3001/geo/latlng?lat=${coordinates.lat}&lng=${coordinates.lng}`
    );
    const locationInfo = locationResponse.data.data;
    dispatch({ type: ACTIONS.SET_COUNTRY_INFORMATION, payload: locationInfo });
    dispatch({ type: ACTIONS.SET_GEO_LOCATION, payload: coordinates });
  };

  const onAdressClick = (address) => {
    onAddressChange(address);
  };
  return (
    <PlacesAutocomplete
      onChange={onAddressChange}
      onSelect={onAddressSelect}
      value={stateAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Fragment>
          <div className="search-bar">
            <Input
              {...getInputProps({
                id: "address-input",
                placeholder: "Search",
              })}
            />
            <Button
              type="primary"
              onClick={() => onAddressSelect(stateAddress)}
            >
              <SearchOutlined />
              Search
            </Button>
          </div>

          <div className="sugesstion-dropdown">
            {loading ? <div>Loading...</div> : null}
            {suggestions.map((suggestion) => {
              const style = suggestion.active
                ? {
                    backgroundColor: "black",
                    color: "white",
                    cursor: "pointer",
                    padding: "5px",
                  }
                : {
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    padding: "5px",
                  };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    style,
                  })}
                  key={suggestion.description}
                  onClick={() => onAdressClick(suggestion.description)}
                >
                  <div>{suggestion.description}</div>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchByInput;
