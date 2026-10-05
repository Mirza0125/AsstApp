import React from 'react';
import {StatusBar, View, Text, Image} from 'react-native';
// components
import {Layout, Colors} from 'src/theme';
import LottieView from 'lottie-react-native';

const SplashScreen = ({source}) => {
  const {fill, center} = Layout;
  return (
    <View style={[fill, {width: '100%', alignItems: 'center'}]}>
      <Image
        style={{width: '80%', height: '18%', marginTop: '60%'}}
        resizeMode={'contain'}
        source={require('../../../assets/images/splash.png')}
      />
    </View>
  );
};
export default SplashScreen;
