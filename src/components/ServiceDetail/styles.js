import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  reviewerPicWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  cardWrapper: {
    width: 200,
    height: 80,
    borderColor: Colors.brightSun,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 5,
    //borderColor: '#707070',
    //borderWidth: 0,
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reviewer: {width: 26, height: 26, resizeMode: 'contain'},
  font: {fontSize: 14},
});
