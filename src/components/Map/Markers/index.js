import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import {Marker} from 'react-native-maps';

// styles
import {lightTheme} from '../../../theme';

const Markers = ({coordinates, selectedPickUpLocation, title, description}) => {
  const {
    container,
    markerContainerStyle,
    markerStyle,
    dropOffMarkerBorderStyle,
  } = styles;

  return (
    <Marker coordinate={coordinates} title={title} description={description}>
      <View style={container}>
        <View style={markerContainerStyle} />
        <View
          style={[
            markerStyle,
            selectedPickUpLocation && dropOffMarkerBorderStyle,
          ]}
        />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainerStyle: {
    backgroundColor: lightTheme.locationMarkerBgColor,
    width: 40,
    height: 40,
    borderColor: '#1B6F5B15',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.21,
  },
  markerStyle: {
    width: 10,
    height: 10,
    borderRadius: 30,
    borderWidth: 5,
    position: 'absolute',
    alignSelf: 'center',
    borderColor: lightTheme.pickUpLocationMarkerColor,
  },
  dropOffMarkerBorderStyle: {
    borderColor: lightTheme.dropOffLocationMarkerColor,
  },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

Markers.propTypes = {
  coordinates: PropTypes.object,
  selectedPickUpLocation: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Markers;
