import React from "react";

class Weather extends React.Component {
  render() {
    return (
      <div>
        {this.props.displayWeather &&
          this.props.weatherData.map((i, key) => (
            <div key={key}>
              <p>description: {i.description}</p>
              <p>date: {i.date}</p>
            </div>
          ))}
      </div>
    );
  }
}

export default Weather;
