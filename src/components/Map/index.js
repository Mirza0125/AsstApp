import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

// components
import MapView, {PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';

const Map = ({
  initialLatitude,
  initialLongitude,
  zoomEnabled = true,
  zoomControlEnabled = true,
  zoomTapEnabled = true,
  rotateEnabled = true,
  scrollEnabled = true,
  onRegionChangeComplete,
  showsUserLocation,
  children,
}) => {
  const {width, height} = Dimensions.get('window');
  const {mapStyle} = styles;

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={mapStyle}
      initialRegion={{
        latitude: initialLatitude,
        longitude: initialLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: (0.0922 * width) / height,
      }}
      mapType={Platform.OS === 'android' ? 'none' : 'standard'}
      onRegionChangeComplete={onRegionChangeComplete}
      maxZoomLevel={25}
      minZoomLevel={0}
      rotateEnabled={rotateEnabled}
      scrollEnabled={scrollEnabled}
      zoomEnabled={zoomEnabled}
      zoomControlEnabled={zoomControlEnabled}
      zoomTapEnabled={zoomTapEnabled}
      showsUserLocation={showsUserLocation}>
      {children}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    width: '100%',
    height: 145,
  },
});

Map.propTypes = {
  initialLatitude: PropTypes.number,
  initialLongitude: PropTypes.number,
  zoomEnabled: PropTypes.bool,
  zoomControlEnabled: PropTypes.bool,
  zoomTapEnabled: PropTypes.bool,
  rotateEnabled: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
  onRegionChangeComplete: PropTypes.func,
  children: PropTypes.node,
};

export default Map;
