import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    height: 170,
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

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flexDirection: 'row',
    // marginHorizontal: "5%"
  },
  slide: {
    alignSelf: 'center',
    width: '100%',
    // flex:1,
    height: windowHeight - windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    // marginLeft: "3%"
  },
  dotContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#CED3D8',
  },
  activeDot: {
    backgroundColor: '#30D5C8',
  },
});
