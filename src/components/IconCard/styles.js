import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';

export default StyleSheet.create({
  wrapper: {
    height: 100,
    width: 100,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderRadius: 5,
  },
  image: {width: 30, height: 30, resizeMode: 'contain'},
  mainWrapper: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
