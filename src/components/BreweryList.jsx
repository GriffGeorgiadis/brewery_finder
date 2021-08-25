import React from 'react';
import axios from 'axios';

class BreweryList extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log(this.props.currentBreweries[e.target.value]);
    let brewery = this.props.currentBreweries[e.target.value]
    axios.post('/saveBrewery', brewery)
      .then((result) => {
        console.log("Added to my breweries");
        this.props.getBreweries();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="brewery-list">
        <div className="brewery-list-current">
          <h3 className="brewery-list-title">
            Found {this.props.currentBreweries.length} Breweries!
          </h3>
          {this.props.currentBreweries.map((brewery, index) => {
            return (
              <div className="brewery-list-item" key={index}>
                <div className="brewery-list-name"><b>Name:</b> {brewery.name}</div>
                <div className="brewery-list-address"><b>Address:</b>  {brewery.address}</div>
                <div className="brewery-list-rating"><b>Rating:</b>  {brewery.rating}</div>
                <button type="submit" name="Submit" onClick={this.handleSubmit} value={index} >Add to My Breweries</button>
              </div>
            );
          })}
        </div>
        <div className="brewery-list-mine">
          <h3 className="brewery-list-title">
            My Breweries!
          </h3>
          {this.props.myBreweries.map((brewery, index) => {
            return (
              <div className="brewery-list-item" key={index}>
                <div className="brewery-list-name"><b>Name:</b>  {brewery.name}</div>
                <div className="brewery-list-address"><b>Address:</b>  {brewery.address}</div>
                <div className="brewery-list-rating"><b>Rating:</b>  {brewery.rating}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default BreweryList;
