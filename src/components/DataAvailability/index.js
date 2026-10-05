import React from 'react';
import PropTypes from 'prop-types';

// components
import {View, StyleSheet, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import Text from '../Text';

// colors
import {Colors} from 'src/theme';

// images
//import EmptyFile from 'src/assets/images/file.png';

const DataAvailability = ({
  requesting,
  source,
  hasData,
  children,
  center,
  style,
  containerStyle,
  textContainerStyle,
}) => {
  if (requesting) {
    return (
      <View
        style={
          containerStyle
            ? containerStyle
            : center
            ? styles.center
            : styles.container
        }>
        <LottieView
          source={source ? source : require('./lottie.json')}
          autoPlay
          loop
          speed={2}
          style={style}
        />
      </View>
    );
  }

  if (!hasData) {
    return (
      <View style={textContainerStyle ? textContainerStyle : styles.container}>
        <Text
          text="No record available currently."
          bold
          style={[{fontSize: 14}, style]}
        />
      </View>
    );
  }

  return children;
};

DataAvailability.propTypes = {
  requesting: PropTypes.bool,
  hasData: PropTypes.bool,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  emptyFile: {
    width: 150,
    height: 150,
  },
});

export default DataAvailability;
