import React, {useState} from 'react';
import {StatusBar, View, Image} from 'react-native';
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
import {TouchableOpacity} from 'react-native-gesture-handler';
const AuthMain = (props) => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const {requesting, serverErrors, navigation} = props;

  const {fill, center} = Layout;
  const {textRegular, textMedium, textLarge} = Fonts;

  return (
    <View style={[fill, {width: '100%', alignItems: 'center'}]}>
      <Image
        style={{width: '60%', height: '18%', marginTop: '40%'}}
        resizeMode={'contain'}
        source={require('../../../assets/images/splash.png')}
      />

      <Button
        text="Sign Up"
        color="primary"
        block
        style={{marginTop: '30%', width: '90%', alignSelf: 'center'}}
        onPress={() => {
          if (termsAccepted) {
            navigation.navigate('LoginUserType', {
              for: 'signup',
            });
          } else {
            Toast.show({
              text1: 'Terms and Conditions',
              text2: 'Please accept terms and conditions first!',
              type: 'error',
              position: 'bottom',
              bottomOffset: 40,
            });
          }
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: '10%',
        }}>
        <CheckBox
          style={{width: 15, height: 15, borderWidth: 0, marginRight: 10}}
          disabled={false}
          boxType="square"
          value={termsAccepted}
          onValueChange={(val) => setTermsAccepted(val)}
        />

        <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
          <Text style={[textRegular]}>
            I agree to
            <Text style={[textRegular, {color: Colors.Turquoise}]}>
              {' Terms and Conditions'}
            </Text>
            <Text style={[textRegular]}>{' and'}</Text>
            <Text style={[textRegular, {color: Colors.Turquoise}]}>
              {' Privacy Policy.'}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={[textLarge]}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            if (termsAccepted) {
              navigation.navigate('Login');
            } else {
              Toast.show({
                text1: 'Terms and Conditions',
                text2: 'Please accept terms and conditions first!',
                type: 'error',
                position: 'bottom',
                bottomOffset: 40,
              });
            }
          }}
          style={{marginHorizontal: 5}}>
          <Text style={[textLarge, {color: Colors.Turquoise}]}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AuthMain;
