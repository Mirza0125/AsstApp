import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: 414,
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    left: 120,
    color: 'white',
    fontSize: 32,
    fontFamily: 'CrimsonText-Bold',
  },
  description: {
    lineHeight: 25,
  },
  button: {width: 240, alignSelf: 'center'},
});
