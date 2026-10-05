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
    height: 77,
    marginVertical: 8,
    backgroundColor: '#F5F5F5',
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
  topRoundedStyle: {
    height: 77,
    marginVertical: 0,
    backgroundColor: '#F5F5F5',
    borderWidth: 0,
    borderColor: '#707070',
    // borderTopRightRadius: 8,
    borderTopStartRadius: 8,
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
    //resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  view: {
    borderLeftWidth: 1,
    borderColor: '#EAECEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ratings: {
    paddingVertical: 4,
    width: 90,
  },
});
