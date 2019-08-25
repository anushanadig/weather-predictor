import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  componentDidUpdate() {
    console.log("updated");
  }

  render() {
    return (
      <div>
        {this.state.lat && <SeasonDisplay lat={this.state.lat} />}
        <br />
        {this.state.errorMessage && <p>Error:{this.state.errorMessage}</p>}
        {!this.state.lat && !this.state.errorMessage && (
          <Spinner message="Please accept the request" />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
