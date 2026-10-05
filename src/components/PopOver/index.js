import React from 'react';
import {Content, Icon} from 'native-base';
import {View, Platform, TouchableOpacity, StyleSheet} from 'react-native';
// components
import Text from '../Text';

// theme
import {Layout, Images, Gutters, Fonts} from 'src/theme';

// styles
//import styles from './styles';

const PopOver = ({
  top,
  bottom,
  buttonStyle,
  onPress,
  buttonName,
  title,
  description,
  style,
}) => {
  return (
    <View
      style={[
        style,
        {
          zIndex: 1,
          width: 193,
          height: 115,
          borderRadius: 12,
          position: 'absolute',
          shadowColor: '#000', //'#707070',
          backgroundColor: 'white',
          shadowOffset: {
            width: Platform.OS === 'android' ? 0 : 0,
            height: Platform.OS === 'android' ? 12 : 12,
          },
          elevation: Platform.OS === 'android' ? 24 : 24,
          shadowOpacity: Platform.OS === 'android' ? 0.58 : 0.58,
          shadowRadius: Platform.OS === 'android' ? 16.0 : 16.0,
        },
      ]}>
      <View
        style={{
          width: 193,
          height: 115,
          paddingLeft: 20,
          paddingRight: 28,
          borderRadius: 12,
          paddingVertical: 20,
          alignItems: 'flex-start',
          backgroundColor: 'white',
        }}>
        <Text text={title} bold color="primary" style={{textAlign: 'center'}} />
        <Text
          text={description}
          color="quinary"
          style={{
            fontSize: 10,
            marginTop: 4,
            lineHeight: 15,
            fontWeight: '700',
          }}
        />
        <Text
          onPress={onPress}
          text={buttonName}
          color="quaternary"
          style={[
            Platform.OS === 'android'
              ? {left: 126, top: 15, fontSize: 16, fontWeight: '700'}
              : {left: 125, top: 15, fontSize: 16, fontWeight: '700'},
            buttonStyle,
          ]}
        />
      </View>
      {top && (
        <View
          style={{
            width: 40,
            height: 38,
            right: 95,
            top: -10,
            zIndex: Platform.OS === 'android' ? -1 : -444444441,
            position: 'absolute',
            shadowColor: Platform.OS === 'android' && '#707070',
            backgroundColor: 'white',
            shadowOffset: {
              width: Platform.OS === 'android' ? 0 : 0,
              height: Platform.OS === 'android' ? 0 : 12,
            },
            elevation: Platform.OS === 'android' ? 0 : 24,
            shadowOpacity: Platform.OS === 'android' ? 0 : 0.58,
            shadowRadius: Platform.OS === 'android' ? 0 : 16.0,
            transform: [
              {rotateY: '58deg'},
              {rotateZ: '64deg'},
              {rotateX: '7deg'},
            ],
          }}
        />
      )}
      {bottom && (
        <View
          style={{
            width: 54.5,
            height: 30,
            right: 95,
            bottom: -7,
            zIndex: Platform.OS === 'android' ? -1 : -444444441,
            position: 'absolute',
            shadowColor: '#707070',
            backgroundColor: 'white',
            shadowOffset: {
              width: Platform.OS === 'android' ? 0 : 0,
              height: Platform.OS === 'android' ? 0 : 12,
            },
            elevation: Platform.OS === 'android' ? 0 : 24,
            shadowOpacity: Platform.OS === 'android' ? 0 : 0.58,
            shadowRadius: Platform.OS === 'android' ? 0 : 16.0,
            transform: [
              {rotateY: Platform.OS === 'android' ? '20deg' : '30deg'},
              {rotateZ: Platform.OS === 'android' ? '37deg' : '36deg'},
              {rotateX: Platform.OS === 'android' ? '49deg' : '49deg'},
            ],
          }}
        />
      )}
    </View>
  );
};

export default PopOver;
