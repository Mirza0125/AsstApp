import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {
    fontSize: 20,
    position: 'absolute',
    left: 25,
  },

  primaryBg: {
    backgroundColor: Colors.Alabaster,
  },

  reviewer: {
    width: 46,
    height: 46,
    resizeMode: 'cover',
  },
  PicWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  rating: {
    paddingVertical: 4,
  },
  locationIcon: {
    fontSize: 20,
  },
  mainWrapper: {
    borderTopRightRadius: 8,
    borderTopStartRadius: 8,
    padding: 20,
  },

  locationWrapper: {
    marginTop: 2,
  },

  paymentMethodWrapper: {
    marginTop: 60,
    marginBottom: 20,
  },
  mastercard: {
    width: 55,
    height: 37,
  },
  check: {
    fontSize: 16,
    color: 'green',
  },
});
