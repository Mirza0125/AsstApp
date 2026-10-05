import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {
    fontSize: 20,
    position: 'absolute',
    left: 25,
  },
  image: {
    width: 107,
    height: 102,
  },
  heartIcon: {
    color: Colors.torchRed,
    fontSize: 16,
  },
  message: {
    width: 121,
    height: 28,
    resizeMode: 'contain',
  },
  mainBg: {
    backgroundColor: Colors.white,
  },
  tagInput: {
    height: 53,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginBottom: 10,
  },
  tag: {fontSize: 22, color: 'red'},
  note: {
    height: 100,
    backgroundColor: '#F5F5F5',
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  line: {height: 3, backgroundColor: '#DCE0E5', opacity: 0.5},
  heartIcon: {
    color: Colors.torchRed,
    fontSize: 16,
  },
  image: {
    width: 107,
    height: 102,
  },
  ratingStyle: {paddingVertical: 2},
  message: {
    width: 110,
    height: 28,
    resizeMode: 'contain',
  },
  topWrapper: {marginTop: 36, marginBottom: 23},
  map: {width: '100%', height: 145},
});
