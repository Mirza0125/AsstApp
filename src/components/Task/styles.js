import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  reviewer: {
    width: 46,
    height: 46,
    resizeMode: 'contain',
  },
  PicWrapper: {
    width: 46,
    height: 46,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainWrapper: {
    height: 102,
    paddingTop: 17,
    paddingLeft: 26,
    paddingBottom: 19,
    padding: 20,
  },

  text: {
    paddingLeft: 19,
    paddingLeft: 19,
  },

  button: {
    marginTop: 220,
  },
  heartIcon: {
    color: Colors.torchRed,
    fontSize: 16,
  },
});
