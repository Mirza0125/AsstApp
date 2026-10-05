import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  unselectedSlotStyle: {
    flex: 1,
    width: '90%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderRadius: 5,
    flexDirection: 'row',
    marginVertical: '2%',
    height: 88,
    alignItems: 'center',
  },

  selectedSlotStyle: {
    flex: 1,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#30D5C8',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderRadius: 5,
    flexDirection: 'row',
    marginVertical: '2%',
    height: 88,
    alignItems: 'center',
  },
});
