import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import Marker from './Marker'
import InfoWindow from './InfoWindow'
import DetailsPage from './DetailsPage'

class Map extends Component {
  static propTypes = {
    panel: PropTypes.bool.isRequired,
    locations: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired
  }

  eventHandler = (location, pos) => {
    this.setState({ marker: location });
    this.props.eventHandler(location, pos)
  }

  // This function draws error message window below header when some data are not loaded
  drawError = (map, wiki, flickr) => {
    return (
      <div>
      <span>Please refresh browser... page is experencing one or more of the following error(s):</span>
      <ol>
          {map    ? null :  ( <li>ERROR: There was a problem with loading Google Maps!</li>)}
          {wiki   ? null :  ( <li>ERROR: There was a problem with fetching data from Wikipedia!</li>)}
          {flickr ? null :  ( <li>ERROR: There was a problem with fetching images from Flickr!</li>)}
      </ol>
      </div>
    )
  }

  render() {

    const { panel, locations, marker, closeInfoWindow, infoWindow, modal, closeModal, openModal, isLoaded } = this.props

    return (
      <main
        id="map"
        className={`panel-${panel ? 'show' : 'hidden'}`}>

        <DetailsPage
          marker={marker}
          modal={modal}
          closeModal={closeModal}
        />
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyCXdsWfGQqtulHkiYeJb6GHe2Pm_K3Lidg',
            languages: ['en'],
            region: 'is'
            // TODO add something extra???
          }}
          options={{ styles: this.props.style,
                     scrollwheel: true
          }}
          center={this.props.center}
          zoom={this.props.zoom}
          tabIndex={panel ? 0 : -1}
          role="application"
        >

        {/* Populate Markers */}
        {locations.map(location => (
          <Marker
            key={location.id}
            lat={location.position.lat}
            lng={location.position.lng}
            name={location.name}
            location={location}
            eventHandler={this.eventHandler}
            marker={marker}
            panel={panel}
          />
        ))}



        {/* InfoWindow appears when marker is clicked and disapears after filter results */}
        {marker.length !== 0 && infoWindow && (
          <InfoWindow
            info={marker}
            lat={marker.position.lat}
            lng={marker.position.lng}
            eventHandler={this.eventHandler}
            closeInfoWindow={closeInfoWindow}
            openModal={openModal}
          />

        )}

        </GoogleMapReact>

        {/* Error handling notification message */}
        {isLoaded.map && isLoaded.wiki && isLoaded.flickr
          ? null
          : (
              <div className="error">
                {this.drawError(isLoaded.map, isLoaded.wiki, isLoaded.flickr)}
              </div>
          )}

      </main>
    );
  }
}

export default Map;