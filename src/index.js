import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

const spinnerMessage = "Fetching weather details based on your location";
const TIMEOUT_REJECT = "timeout";

class App extends React.Component {
  state = { lat: null, errorMessage: "", isLoading: true };

  async componentDidMount() {
    const weatherPromise = new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(
        position => resolve(position),

        err => reject(err)
      );
    });

    //error out if the api takes more than 5 secs to fetch location
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject(TIMEOUT_REJECT), 5000);
    });

    try {
      const response = await Promise.race([weatherPromise, timeoutPromise]);
      if (response.coords) {
        this.setState({ lat: response.coords.latitude, isLoading: false });
      }
    } catch (error) {
      if (error === TIMEOUT_REJECT) {
        this.setState({ errorMessage: error, isLoading: false });
      } else {
        this.setState({
          errorMessage: error.message,
          isLoading: false
        });
      }
    }
  }

  render() {
    const { isLoading, lat, errorMessage } = this.state;

    if (isLoading) {
      return <Spinner message={spinnerMessage} />;
    }

    if (errorMessage) {
      return (
        <div className="container">
          <iframe
            src="https://giphy.com/embed/l0NwH7dwPKUpKdphC"
            width="480"
            height="360"
            frameBorder="0"
            className="giphy-embed "
            allowFullScreen
          ></iframe>
          <p className="error">
            <a href="https://giphy.com/gifs/blues-sickness-under-the-weather-l0NwH7dwPKUpKdphC">
              Looks like Google location API is under the weather ¯\_(ツ)_/¯
            </a>
          </p>
        </div>
      );
    }
    return lat && <SeasonDisplay lat={lat} />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
