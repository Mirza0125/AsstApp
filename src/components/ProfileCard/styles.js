import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';

export default StyleSheet.create({
  wrapper: {
    height: 102,
    width: 108,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  image: {width: 108, height: 102},
  mainWrapper: {
    width: 108,
    paddingBottom: 10,
  },
});
