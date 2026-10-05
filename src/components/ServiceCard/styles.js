import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';

export default StyleSheet.create({
  wrapper: {
    height: 80,
    width: 100,
    padding: 10,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.white,
    borderColor: Colors.brightSun,
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {width: 45, height: 45},
});
