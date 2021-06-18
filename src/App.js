/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

class App extends React.Component {
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
        `https://eu1.locationiq.com/v1/search.php?key=pk.acee6642223badb53b46f2eafaac6fd5&q=${searchQuery}&format=json`
      );
      let weatherAxios = await axios.get(
        `${process.env.REACT_APP_WEATHER_URL}/weather?searchQuery=${searchQuery}`
      );
      let moviesAxios = await axios.get(
        `${process.env.REACT_APP_MOVIES_URL}/movie?searchQuery=${searchQuery}`
      );
      this.setState({
        displayErrorMessage: false,
        weatherData: weatherAxios.data,
        locationData: locationAxios.data[0],
        moviesData: moviesAxios.data,
        displayMap: true,
        displayWeather: true,
      });
    } catch {
      this.setState({
        displayErrorMessage: true,
        displayMap: false,
        displayWeather: false,
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
        <p>{console.log(this.state.weatherData)}</p>
        {console.log("this is the first console")}
        <h1>city-explorer-app</h1>
        <form onSubmit={this.getLocations}>
          <input
            type="text"
            onChange={this.updateSearchQuery}
            placeholder="city name"
            name="searchQuery"
          ></input>
          <input type="submit" value="search"></input>
        </form>
        <p>City Information: {this.state.locationData.display_name}</p>
        <p>Latitude: {this.state.locationData.lat}</p>
        <p>Longitude: {this.state.locationData.lon}</p>
        {this.state.displayMap && (
          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.acee6642223badb53b46f2eafaac6fd5&markers=icon:%3Cicon%3E|${this.state.locationData.lat},${this.state.locationData.lon}`}
            alt={`map`}
          />
        )}
        <h1>Weather Data</h1>
        {this.state.displayWeather &&
          this.state.weatherData.map((i, key) => (
            <div key={key}>
              <p>description: {i.description}</p>
              <p>date: {i.date}</p>
            </div>
          ))}

        <h1>Movies Data</h1>
        {this.state.moviesData.map((j, key) => (
          <div>
            <Card class="card" style={{ width: "50em" }}>
              <Card.Body>
                <Card.Text>
                  <Card.Body>
                    <p>title: {j.title}</p>
                  </Card.Body>
                  <Card.Body>
                    <p>overview: {j.overview}</p>
                  </Card.Body>
                  <Card.Body>
                    <p>average vote: {j.vote_average}</p>
                  </Card.Body>
                  <Card.Body>
                    <p>total vote: {j.vote_count}</p>
                  </Card.Body>
                  <Card.Body>
                    <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${j.poster_path}`} alt={"img"} />
                  </Card.Body>
                  <Card.Body>
                    <p>popularity: {j.popularity}</p>
                  </Card.Body>
                  <Card.Body>
                    <p>release date: {j.release_date}</p>
                  </Card.Body>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}

        {this.state.displayErrorMessage && this.state.errorMessage}
      </div>
    );
  }
}
export default App;
