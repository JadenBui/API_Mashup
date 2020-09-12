import { Input, Button, message } from "antd";
import React, { useState, useContext } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { GeoContext } from "../../contexts/GeoContext";
import axios from "axios";
import ACTIONS from "../../contexts/actions/geoActions";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";

const LocationSearchByInput = () => {
  const [stateAddress, setAddress] = useState("");
  const onAddressChange = (address) => {
    setAddress(address);
  };
  const { geoDispatch } = useContext(GeoContext);

  const onAddressSelect = async () => {
    if (stateAddress.trim().length === 0) {
      return message.error("The search bar is empty!");
    }
    try {
      const fomarttedAddress = encodeURI(stateAddress.toLowerCase());
      const coordinateResponse = await axios.get(
        `http://localhost:3001/geo/address/${fomarttedAddress}`
      );
      const coordinateResult = coordinateResponse.data.data.results[0];
      const coordinates = coordinateResult.geometry.location;
      const locationResponse = await axios.get(
        `http://localhost:3001/geo/latlng?lat=${coordinates.lat}&lng=${coordinates.lng}`
      );
      const locationInfo = locationResponse.data.data;
      geoDispatch({
        type: ACTIONS.SET_COUNTRY_INFORMATION,
        payload: locationInfo,
      });
      geoDispatch({ type: ACTIONS.SET_GEO_LOCATION, payload: coordinates });
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const onAddressClick = (address) => {
    onAddressChange(address);
  };

  const onAddressNotFound = () => {
    message.error("Sorry, the address is not found!");
  };

  return (
    <PlacesAutocomplete
      onChange={onAddressChange}
      onSelect={onAddressSelect}
      onError={onAddressNotFound}
      value={stateAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="search-section">
          <div className="search-bar">
            <Input
              {...getInputProps({
                id: "address-input",
                placeholder: "Search",
              })}
            />
            <Button type="primary" onClick={onAddressSelect}>
              <SearchOutlined />
              Search
            </Button>
          </div>

          <div className="sugesstion-dropdown">
            {loading ? (
              <div style={{ textAlign: "center" }}>
                <LoadingOutlined />
              </div>
            ) : (
              suggestions.map((suggestion) => {
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
                    key={suggestion.placeId}
                    onClick={() => onAddressClick(suggestion.description)}
                  >
                    <div>{suggestion.description}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchByInput;
