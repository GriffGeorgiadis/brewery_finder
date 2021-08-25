import React from "react";
import axios from "axios";
import LocationForm from "./LocationForm.jsx";
import BreweryList from "./BreweryList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myBreweries: [],
      currentBreweries: [],
    };
    this.getMyBreweries = this.getMyBreweries.bind(this);
    this.getCurrentBreweries = this.getCurrentBreweries.bind(this);
  }

  componentDidMount() {
    this.getMyBreweries();
  }

  getMyBreweries() {
    axios
      .get("/getBreweries")
      .then((result) => {
        this.setState({
          myBreweries: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCurrentBreweries(breweries) {
    this.setState({
      currentBreweries: breweries,
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Find A Brewery</h1>
        <div className="beerImg">
          <img src="/beer"></img>
        </div>
        <LocationForm getCurrentBreweries={this.getCurrentBreweries} />
        <BreweryList
          currentBreweries={this.state.currentBreweries}
          myBreweries={this.state.myBreweries}
          getBreweries={this.getMyBreweries}
        />
      </div>
    );
  }
}

export default App;
