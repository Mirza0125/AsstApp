import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const CodeVerificationInput = ({onFulfill}) => (
  <OTPInputView
    style={styles.otp}
    pinCount={5}
    autoFocusOnLoad
    codeInputFieldStyle={styles.input}
    onCodeFilled={(code) => onFulfill(code)}
  />
);

const styles = StyleSheet.create({
  otp: {
    height: 50,
    marginTop: 20,
  },
  input: {
    color: Colors.black,
    backgroundColor: Colors.wildSand,
    fontSize: 25,
    width: 50,
    height: 50,
    borderRadius: 6,
    borderWidth: 0,
  },
});

export default CodeVerificationInput;
