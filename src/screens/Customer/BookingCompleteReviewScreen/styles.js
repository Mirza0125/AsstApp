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
  },
  ratingStyle: {
    paddingVertical: 4,
  },
  locationIcon: {
    fontSize: 20,
  },
  mainWrapper: {
    height: 102,
    paddingTop: 17,
    paddingLeft: 26,
    paddingBottom: 19,
    borderRadius: 6,
    padding: 20,
  },

  locationWrapper: {
    marginTop: 2,
  },

  button: {
    marginTop: 216,
  },
  review: {
    height: 100,
    marginTop: 19,
    backgroundColor: Colors.Alabaster,
    borderRadius: 6,
  },
  text: {
    paddingLeft: 19,
    paddingLeft: 19,
  },
  input: {
    padding: 20,
    top: 0,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  ratingReview: {
    marginTop: 31,
  },
  button: {
    marginTop: 220,
  },
});
