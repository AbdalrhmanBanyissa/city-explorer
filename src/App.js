import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: "",
      weatherData: {},
      errorMessage: "",
      displayErrorMessage: false,
      displayMap: false,
    };
  }

  getLocations = async (event) => {
    event.preventDefault();
    let searchQuery = event.target.searchQuery.value;

    try {
      let locationAxios = await axios.get(
        `https://eu1.locationiq.com/v1/search.php?key=pk.acee6642223badb53b46f2eafaac6fd5&q=${searchQuery}&format=json`
      );
      let weatherAxios = await axios.get(
        `${process.env.REACT_APP_URL}/weather?cityName=${searchQuery}`
      );
      this.setState({
        displayErrorMessage: false,
        weatherData: weatherAxios.data,
        locationData: locationAxios.data[0],
        displayMap: true,
      });
    } catch {
      this.setState({
        displayErrorMessage: true,
        displayMap: false,
        errorMessage: "ERROR! This is bad respons",
      });
    }
    
  };

  render() {
    return (
      <div>
        <h1>city-explorer-app</h1>
        <form onSubmit={this.getLocations}>
          <input type="text" placeholder="city name" name="searchQuery"></input>
          <input type="submit" value="search"></input>
        </form>
        <p>City Information: {this.state.locationData.display_name}</p>
        <p>Latitude: {this.state.locationData.lat}</p>
        <p>Longitude: {this.state.locationData.lon}</p>
        {this.state.displayMap && (
          <img
            onSubmit={this.getLocations}
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.acee6642223badb53b46f2eafaac6fd5&markers=icon:%3Cicon%3E|${this.state.locationData.lat},${this.state.locationData.lon}`}
            alt={`map`}
          />
        )}
        <h1>Weather Data</h1>
        <p>{JSON.stringify(this.state.weatherData[0])}</p>
        {this.state.displayErrorMessage && this.state.errorMessage}
      </div>
    );
  }
}

export default App;
