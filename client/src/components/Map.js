import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import keys from './../keys';

import GoogleMap, {
  GoogleApiWrapper,
  InfoWindow,
  Marker,
} from 'google-maps-react';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      selectedPlace: {},
      activeMarker: {},
    };
  }

  onMapClick = (props, event, place) => {
    if (!place.placeId) {
      return;
    }

    console.log(place.placeId);

    this.setState({
      showingInfoWindow: true,
      activeMarker: null,
    });
  }

  onMarkerClick = (place, marker, e) => {
    if (!this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: true,
        selectedPlace: place,
        activeMarker: marker,
      })
    }
  }

  render() {
    console.log(this.state.selectedPlace);

    console.log(this.props.google);

    return (
      <MapContainer>
        <GoogleMap
          google={this.props.google}
          style={{width: '100%', height: '100%'}}
          className='map'
          zoom={15}
          centerAroundCurrentLocation={true}
          onClick={this.onMapClick}
          clickableIcons={true}
          disableDefaultUI={true}
          InfoWindow={<div>Hello</div>}
        >

          {/* <Marker onClick={this.onMarkerClick}
            name={'Current location'} /> */}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>hello {this.state.selectedPlace.name} </h1>
            </div>
          </InfoWindow>

        </GoogleMap>
      </MapContainer>
    );
  }
}

const MapContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const loadingContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
`;

export default GoogleApiWrapper({
  apiKey: keys.google_maps_api_key,
  libraries: ['places', 'visualization'],
  LoadingContainer: loadingContainer,
})(Map);