import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';

export default StyleSheet.create({
  primary: {backgroundColor: Colors.primary},

  secondary: {backgroundColor: Colors.white},

  transparent: {backgroundColor: 'transparent'},

  primaryText: {color: Colors.white},

  secondaryText: {color: Colors.black},

  largeHeader: {
    height: 70,
  },

  roundedBg: {
    backgroundColor: Colors.primary,
  },
  titleText: {
    fontSize: 20,
    lineHeight: 32,
  },

  leftStyle: {
    width: 30,
  },

  bodyStyle: {
    flex: 1,
    marginHorizontal: 16,
  },

  rightStyle: {
    width: 30,
  },
});
