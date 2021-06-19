import React from "react";
import axios from "axios";
import Weather from "./Weather";
import Movies from "./Movies";
import Locations from "./Locations";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: "",
      weatherData: [],
      moviesData: [],
      errorMessage: "",
      displayErrorMessage: false,
      displayMap: false,
      displayWeather: false,
    };
  }
  getLocations = async (event) => {
    event.preventDefault();
    let searchQuery = event.target.searchQuery.value;

    try {
      let locationAxios = await axios.get(
        `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONS_KEY}&q=${searchQuery}&format=json`
      );

      this.setState({
        displayErrorMessage: false,
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

  getWeather = async (event) => {
    event.preventDefault();
    let searchQuery = event.target.searchQuery.value;

    try {
      let weatherAxios = await axios.get(
        `${process.env.REACT_APP_SERVER}/weather?searchQuery=${searchQuery}`
      );
      this.setState({
        displayErrorMessage: false,
        weatherData: weatherAxios.data,
        displayWeather: true,
      });
    } catch {
      this.setState({
        displayErrorMessage: true,
        displayWeather: false,
        errorMessage: "ERROR! This is bad respons",
      });
    }
  };
  
  getMoveis = async (event) => {
    event.preventDefault();
    let searchQuery = event.target.searchQuery.value;

    try {
      let moviesAxios = await axios.get(
        `${process.env.REACT_APP_SERVER}/movie?query=${searchQuery}`
      );
      this.setState({
        displayErrorMessage: false,
        moviesData: moviesAxios.data,
      });
    } catch {
      this.setState({
        displayErrorMessage: true,
        errorMessage: "ERROR! This is bad respons",
      });
    }
  };

  updateSearchQuery = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };
  render() {
    return (
      <div>
        <h1>city-explorer-app</h1>
        <form onSubmit={(item) => {
          this.getLocations(item);
          this.getWeather(item);
          this.getMoveis(item);
        }}>
          <input
            type="text"
            onChange={this.updateSearchQuery}
            placeholder="city name"
            name="searchQuery"
          ></input>
          <input type="submit" value="search"></input>
        </form>

        <h1>Locations Data</h1>
        <Locations
          locationData={this.state.locationData}
          displayMap={this.state.displayMap}
        />

        <h1>Weather Data</h1>
        <Weather
          displayWeather={this.state.displayWeather}
          weatherData={this.state.weatherData}
        />

        <h1>Movies Data</h1>
        <Movies moviesData={this.state.moviesData} />

        {this.state.displayErrorMessage && this.state.errorMessage}

      </div>
    );
  }
}

export default Main;
