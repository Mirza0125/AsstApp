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
    marginVertical: 8,
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderColor: '#707070',
    borderRadius: 5,
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reviewer: {width: 46, height: 46, resizeMode: 'cover'},
});
