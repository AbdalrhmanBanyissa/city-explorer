import React from "react";

class Locations extends React.Component {
  render() {
    return (
      <div>
        <p>City Information: {this.props.locationData.display_name}</p>
        <p>Latitude: {this.props.locationData.lat}</p>
        <p>Longitude: {this.props.locationData.lon}</p>
        {this.props.displayMap && (
          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.acee6642223badb53b46f2eafaac6fd5&markers=icon:%3Cicon%3E|${this.props.locationData.lat},${this.props.locationData.lon}`}
            alt={`map`}
          />
        )}
      </div>
    );
  }
}

export default Locations;
