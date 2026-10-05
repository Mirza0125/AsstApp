import {StyleSheet, Platform} from 'react-native';
import {Colors} from 'src/theme';

export default StyleSheet.create({
  primaryBg: {
    backgroundColor: Colors.wildSand,
    borderColor: Colors.wildSand,
  },
  secondaryBg: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E9E9E9',
  },
  wrapper: {
    borderRadius: 5,
    // borderWidth: 0.5,
    // overflow: 'hidden',
    height: 54,
    paddingLeft: 18,
  },
  input: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    paddingLeft: 0,
    paddingRight: 0,
  },
  primaryIcon: {
    color: Colors.silverChalice,
  },
  secondaryIcon: {
    color: Colors.torchRed,
  },
  text: {
    color: Colors.black,
    fontFamily: 'Gilroy-ExtraBold',
    ...Platform.select({
      ios: {
        fontWeight: 'bold',
      },
    }),
  },
  height: {
    height: 25,
  },
  transparentInput: {
    backgroundColor: 'transparent',
    borderColor: Colors.biscay,
    color: Colors.white,
    marginHorizontal: 0,
  },
  transparentInputText: {
    color: Colors.white,
  },
  multilineInput: {
    minHeight: 120,
  },
  borderStyle: {
    borderColor: '#0000000D',
  },
  brightSun: {
    borderColor: Colors.brightSun,
  },
  iconSize: {
    fontSize: 20,
  },
});
