import React from "react";
import Card from "react-bootstrap/Card";

class Movies extends React.Component {
  render() {
    return (
      <div>
        {this.props.moviesData.map((j, key) => (
          <div>
            <Card class="card" style={{ width: "50em", margin: "auto" }}>
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
                    <img
                      src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${j.poster_path}`}
                      alt={"img"}
                    />
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
      </div>
    );
  }
}

export default Movies;
