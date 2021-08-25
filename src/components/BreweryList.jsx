import React from 'react';
import axios from 'axios';

class BreweryList extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(e) {
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

  handleDelete(e) {
    console.log(this.props.myBreweries[e.target.value].name);
    let brewery = this.props.myBreweries[e.target.value];
    axios.post('/deleteBrewery', brewery)
      .then((result) => {
        console.log('Brewery Deleted!')
        this.props.getBreweries();
      })
      .catch((err) => {
        res.send(err);
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
              <div className="myBrewery-list-item" key={index}>
                <div className="myBrewery-list-name"><b>Name:</b> {brewery.name}</div>
                <div className="myBrewery-list-address"><b>Address:</b>  {brewery.address}</div>
                <div className="myBrewery-list-rating"><b>Rating:</b>  {brewery.rating}</div>
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
                <button className="brewery-list-button" type="submit" name="Submit" onClick={this.handleDelete} value={index}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default BreweryList;
