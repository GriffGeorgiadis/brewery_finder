import React from "react";
import axios from "axios";
import { googleMapsKey, mapQuestKey } from '../../api-keys.js';

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      breweries: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${this.state.location}`)
      .then((result) => {
        console.log(result.data.results[0].locations[0].latLng);
        let lat = result.data.results[0].locations[0].latLng.lat;
        let lng = result.data.results[0].locations[0].latLng.lng;
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=3000&type=bar&keyword=brewery&key=${googleMapsKey}`)
          .then((result) => {
            res.send(result.results);
          })
          .catch((err) => {
            res.send(err)
          });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {

    return (
      <div>
        <form>
          <label>
            Enter a city and state (ex. Boston, MA):
            <input type="text" name="location" onChange={this.handleChange} />
          </label>
          <button type="submit" value="Submit" onClick={this.handleSubmit}>Find!</button>
        </form>
      </div>
    );
  }
}

export default LocationForm;