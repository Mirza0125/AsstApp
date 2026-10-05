import React, {useState, useEffect} from 'react';
import {ApplicationProvider} from '@ui-kitten/components';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {Provider as ReduxProvider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar, Dimensions, Platform} from 'react-native';
import {Root} from 'native-base';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from './src/screens/Common/Splash';
import {store} from './src/redux/store';
import NavigatorProvider from './src/navigator';
import {setupHttpConfig} from './src/utils/http';
import {Colors, Images} from 'src/theme';
import RemotePushController from 'src/services/PushNotification';
import Toast from 'react-native-toast-message';
import {View, Text, Image} from 'react-native';

// const X_WIDTH = 375;
// const X_HEIGHT = 812;

// const XSMAX_WIDTH = 414;
// const XSMAX_HEIGHT = 896;

// const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

// let isIPhoneX = false;

// if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
//   isIPhoneX = W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT || W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT;
// }

// function getStatusBarHeight(skipAndroid = false) {
//   if (Platform.OS === 'ios') {
//     return isIPhoneX ? 44 : 50;
//   }
//   if (skipAndroid) {
//     return 0;
//   }
//   return StatusBar.currentHeight;
// }

// const CustomAppStatusBar = ({ backgroundColor, ...props }) => (
//   <View style={{ backgroundColor, height: getStatusBarHeight() }}>
//     <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//   </View>
// );

const persistor = persistStore(store);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAssets();
    StatusBar.setHidden(false, 'none');
    // Platform.OS == 'android' && StatusBar.setBackgroundColor(Colors.gold);
    // Platform.OS == 'android' && StatusBar.setBarStyle('dark-content');
    RemotePushController();
  });

  const loadAssets = () => {
    setTimeout(() => {
      setupHttpConfig(setIsLoading);
    }, 500);
  };

  const toastConfig = {
    success: ({text1, text2, props, ...rest}) => (
      <View
        style={{
          padding: 20,
          height: 60,
          width: '100%',
          borderRadius: 8,
          backgroundColor: '#28B207',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>{text1}</Text>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>{text2}</Text>
        </View>
        <Image
          source={Images.checkedwhite}
          style={{width: 23.24, height: 23.24}}
        />
      </View>
    ),
  };

  const renderLoading = () => <SplashScreen />;

  const renderApp = () => (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <Root>
            {/* <CustomAppStatusBar
              backgroundColor={"#C5A636"}
              barStyle="dark-content"
            /> */}
            <NavigatorProvider />
            <FlashMessage />
            <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />
          </Root>
        </ApplicationProvider>
      </PersistGate>
    </ReduxProvider>
  );

  return isLoading ? renderLoading() : renderApp();
};

export default () => <App />;
