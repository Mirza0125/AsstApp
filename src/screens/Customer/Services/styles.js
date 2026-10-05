import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {
    color: Colors.torchRed,
    fontSize: 20,
    marginLeft: 5,
  },
  searchIcon: {
    backgroundColor: 'white',
    height: 54,
    justifyContent: 'center',
    fontSize: 20,
  },
  flexWrap: {flexDirection: 'row', flexWrap: 'wrap'},
  loader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMore: {
    // height: 80,
    // width: 80,
    //borderRadius: 40,
    marginRight: '3%',
    backgroundColor: '#30D5C8',
  },
  PoppinsM: {
    fontFamily: 'Poppins-Medium',
  },
});
