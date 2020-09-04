import { Input, Button } from "antd";
import React, { useState, Fragment, useContext } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { GeoContext } from "../../contexts/GeoContextProvider";
import axios from "axios";
const LocationSearchByInput = () => {
  const [stateAddress, setAddress] = useState("");
  const onAddressChange = (address) => {
    setAddress(address);
  };
  const geoContext = useContext(GeoContext);

  const onAddressSelect = async (address) => {
    const fomarttedAddress = encodeURI(address);
    const result = await axios.get(
      `http://localhost:3001/geo/${fomarttedAddress}`
    );
    const coordinates = result.data.data.results[0].geometry.location;

    geoContext.setCoordinates(coordinates);
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
