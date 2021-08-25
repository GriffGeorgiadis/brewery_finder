import React from "react";
import axios from "axios";
import { googleMapsKey, mapQuestKey } from "../../api-keys.js";

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      breweries: []
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
    axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${this.state.location}`)
      .then((result) => {
        console.log(result.data.results[0].locations[0].latLng);
        let lat = result.data.results[0].locations[0].latLng.lat;
        let lng = result.data.results[0].locations[0].latLng.lng;
        axios.get(`/googleMaps/${lat},${lng}`)
          .then((result) => {
            this.setState({
              breweries: result.data
            })
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
            <input className="location-form-input" type="text" name="location" onChange={this.handleChange} />
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


// let map;
//         let service;
//         let infowindow;

//         function initMap() {
//           const city = new google.maps.LatLng(lat, lng);
//           infowindow = new google.maps.InfoWindow();
//           map = new google.maps.Map(document.getElementById("map"), {
//             center: city,
//             zoom: 13,
//           });
//           const request = {
//             location: city,
//             radius: "3500",
//             type: ["bar"],
//           };
//           service = new google.maps.places.PlacesService(map);
//           var query = service.nearbySearch(request, (results, status) => {
//             if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//               for (let i = 0; i < results.length; i++) {
//                 if(results[i].name.includes('Brew') || results[i].name.includes('brew')) {
//                   allBreweries.push({ name: results[i].name, address: results[i].vicinity, rating: results[i].rating });
//                 }
//               }
//               console.log(allBreweries);
//               this.setState({
//                 breweries: [...this.state.breweries, allBreweries]
//               })
//               map.setCenter(results[0].geometry.location);
//             }
//           });

//         }

//         initMap();
