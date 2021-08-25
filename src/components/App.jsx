import React from 'react';
import LocationForm from './LocationForm.jsx';
import GoogleMap from './GoogleMap.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Find A Brewery</h1>
        <div id="map"></div>
        {/* <GoogleMap /> */}
        <LocationForm />
      </div>
    );
  }
}

export default App;