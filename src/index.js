import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

const spinnerMessage = "Fetching weather details based on your location";

class App extends React.Component {
  state = { lat: null, errorMessage: "", isLoading: true };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({ lat: position.coords.latitude, isLoading: false }),
      err => this.setState({ errorMessage: err.message, isLoading: false })
    );
  }

  render() {
    const { isLoading, lat, errorMessage } = this.state;

    if (isLoading) {
      return <Spinner message={spinnerMessage} />;
    }

    if (errorMessage) {
      return <p>Error:{errorMessage}</p>;
    }

    return lat && <SeasonDisplay lat={lat} />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
