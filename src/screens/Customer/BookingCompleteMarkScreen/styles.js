import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {
    fontSize: 20,
    position: 'absolute',
    left: 25,
  },
  mainBg: {
    backgroundColor: Colors.white,
  },
  primaryBg: {
    backgroundColor: Colors.Alabaster,
  },
  wrapper: {
    backgroundColor: Colors.white,
    marginTop: 5,
  },
  reviewer: {
    width: 46,
    height: 46,
    resizeMode: 'contain',
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
  marginT1x: {
    marginTop: 1.5,
  },
  locationWrapper: {
    marginTop: 2,
  },
  textWrapper: {
    padding: 22,
  },
  masterCardWrapper: {
    borderRadius: 8,
  },
  bottomRadious: {
    borderBottomEndRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 22,
  },
  chevronIcon: {
    fontSize: 14,
    color: Colors.torchRed,
  },
  paymentMethodWrapper: {
    marginTop: 60,
    marginBottom: 20,
  },
  mastercard: {
    width: 55,
    height: 37,
  },
  button: {
    marginTop: 50,
  },
  check: {position: 'absolute', right: 20, top: 30},
});
