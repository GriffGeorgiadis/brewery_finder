import React from "react";
import axios from "axios";
import { googleMapsKey, mapQuestKey } from "../../api-keys.js";

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      breweries: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `http://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${this.state.location}`
      )
      .then((result) => {
        console.log(result.data.results[0].locations[0].latLng);
        let lat = result.data.results[0].locations[0].latLng.lat;
        let lng = result.data.results[0].locations[0].latLng.lng;
        axios
          .get(`/googleMaps/${lat},${lng}`)
          .then((result) => {
            this.setState({
              breweries: result.data,
            });
            this.props.getCurrentBreweries(this.state.breweries);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="location-form">
        <form>
          <label>
            Enter a city and state (ex. Boston, MA):
            <input
              className="location-form-input"
              type="text"
              name="location"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" value="Submit" onClick={this.handleSubmit}>
            Find!
          </button>
        </form>
      </div>
    );
  }
}

export default LocationForm;
