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
    marginBottom: 1,
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderColor: '#707070',
    borderRadius: 5,
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },

  reviewer: {
    width: 46,
    height: 46,
    resizeMode: 'cover',
  },
  view: {
    borderLeftWidth: 1,
    borderColor: '#EAECEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
