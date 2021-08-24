import React from "react";
import axios from "axios";

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      breweries: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayMap = this.displayMap.bind(this);
  }

  displayMap() {
    let allBreweries = [];
    let map;
    let service;
    let infowindow;

    function initMap() {
      const sydney = new google.maps.LatLng(lat,lng);
      infowindow = new google.maps.InfoWindow();
      map = new google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 13,
      });
      const request = {
        location: new google.maps.LatLng(lat,lng),
        radius: '4000',
        type: ['bar']
      };
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            if (results[i].name.includes('Brew')) {
              allBreweries.push({
                name: results[i].name,
                address: results[i].vicinity,
                rating: results[i].rating
               });
            }
          }
          console.log(allBreweries);
          map.setCenter(results[0].geometry.location);
        }
      });
    }
    function createMarker(place) {
      if (!place.geometry || !place.geometry.location) return;
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });
      google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
      });
    }
    initMap();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=r3eeiKE9EDR64HncMUmnhU888fyx1lsG&location=${this.state.location}`)
      .then((result) => {
        console.log(result.data.results[0].locations[0].latLng);
        let lat = result.data.results[0].locations[0].latLng.lat;
        let lng = result.data.results[0].locations[0].latLng.lng;
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