import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {
    fontSize: 20,
    position: 'absolute',
    left: 25,
  },

  locationIcon: {
    fontSize: 20,
  },

  inputField: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 6,
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  indicatorStyle: {
    backgroundColor: Colors.brightSun,
    height: 4,
  },
  button: {
    color: Colors.torchRed,
  },
});
