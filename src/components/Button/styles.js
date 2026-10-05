import {StyleSheet} from 'react-native';

// styles
import {Colors} from 'src/theme';

export default StyleSheet.create({
  primary: {
    color: Colors.white,
  },
  primaryBg: {
    // backgroundColor: Colors.torchRed,
    backgroundColor: Colors.Turquoise,
  },
  secondary: {
    // color: Colors.torchRed,
    color: Colors.Turquoise,
  },
  secondaryBg: {
    backgroundColor: Colors.white,
  },
  button: {
    height: 50,
    borderRadius: 10,
  },
  disabledStyle: {
    opacity: 0.7,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  borderStyle: {
    borderColor: Colors.primary,
    borderWidth: 1,
    shadowColor: 'transparent',
  },
  redBorderStyle: {
    // borderColor: Colors.torchRed,
    borderColor: Colors.Turquoise,
    borderWidth: 1,
    shadowColor: 'transparent',
  },
});
