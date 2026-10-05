import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {color: Colors.torchRed, fontSize: 20, marginLeft: 5},
  searchIcon: {
    backgroundColor: 'white',
    height: 54,
    justifyContent: 'center',
    fontSize: 20,
  },
  flexWrap: {flexDirection: 'row', flexWrap: 'wrap'},
  loader: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
