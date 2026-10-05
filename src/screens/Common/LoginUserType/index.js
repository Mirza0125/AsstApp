import React, {useState} from 'react';
import {
  StatusBar,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
// components
import {Layout, Colors, Fonts} from 'src/theme';
import LottieView from 'lottie-react-native';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';

import {
  Button,
  Input,
  Error,
  LuckyHeader,
  RNModal,
  Text,
} from '../../../components';
import TermsAndCondition from '../TermsAndCondition';

const LoginUserType = (props) => {
  const [userType, setUsertype] = useState('');

  const {requesting, serverErrors, navigation} = props;

  const {fill, center} = Layout;
  const {textRegular, textMedium, textLarge, titleRegular} = Fonts;

  return (
    <SafeAreaView
      style={[fill, {alignItems: 'center', backgroundColor: '#fff'}]}>
      <LuckyHeader
        left={
          <Image
            style={{width: 14, height: 12, resizeMode: 'contain'}}
            source={require('../../../assets/images/new/arrow-left.png')}
          />
        }
        onPress={() => props.navigation.goBack()}
      />
      <Image
        style={{
          width: '60%',
          height: '18%',
          marginTop: '10%',
          marginBottom: '20%',
        }}
        resizeMode={'contain'}
        source={require('../../../assets/images/LoginIcon.png')}
      />

      <TouchableOpacity
        onPress={() => setUsertype('Resident')}
        style={
          userType === 'Resident'
            ? styles.selectedContainer
            : styles.unselectedContainer
        }>
        <View style={styles.selectedContainer} />
        <Text
          style={[
            titleRegular,
            {
              marginVertical: '5%',
              color: userType === 'Resident' ? Colors.Turquoise : '#000',
            },
          ]}>
          Resident
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setUsertype('Designer')}
        style={
          userType === 'Designer'
            ? styles.selectedContainer
            : styles.unselectedContainer
        }>
        <Text
          numberOfLines={1}
          style={[
            titleRegular,
            {
              marginVertical: '5%',
              color: userType === 'Designer' ? Colors.Turquoise : '#000',
            },
          ]}>
          Community Designer
        </Text>
      </TouchableOpacity>

      <Button
        disabled={userType === ''}
        text="Continue"
        color="primary"
        block
        style={{marginTop: '30%', width: '90%', alignSelf: 'center'}}
        onPress={() => {
          console.log('props.route.params.for ', props.route.params.for);
          if (props.route.params.for === 'signup') {
            navigation.navigate('Register', {
              userType: userType === 'Resident' ? 'customer' : 'employee',
            });
          } else {
            navigation.navigate('Login', {
              userType: userType,
            });
          }
        }}
      />
    </SafeAreaView>
  );
};
export default LoginUserType;

const styles = StyleSheet.create({
  selectedContainer: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#30D5C8',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    width: '90%',
    alignItems: 'center',
  },
  unselectedContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {width: 0, height: 9.33333},
    shadowOpacity: 1,
    shadowRadius: 23.3333,
    elevation: 23.3333,
    width: '90%',
    alignItems: 'center',
    marginVertical: '3%',
  },
});
