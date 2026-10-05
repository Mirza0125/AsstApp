import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  goBack: {
    fontSize: 20,
  },
  image: {
    width: 107,
    height: 102,
    borderRadius: 4,
    borderColor: '#DCE0E5',
    borderWidth: 0.5,
    resizeMode: 'cover',
  },
  heartIcon: {
    // color: Colors.torchRed,
    color: Colors.Turquoise,
    fontSize: 16,
  },
  message: {
    width: 121,
    // height: 31,
    resizeMode: 'cover',
  },
  tabWrapper: {
    flex: 1,
    marginTop: 20,
  },
  labelStyle: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  indicatorStyle: {
    backgroundColor: Colors.white,
    height: 3,
  },
  tabBarStyle: {
    backgroundColor: Colors.white,
  },
  tabBg: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  flexWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: 137,
    height: 50,
    alignSelf: 'center',
    marginVertical: 30,
  },
  servicesTabWrapper: {
    backgroundColor: Colors.Alabaster,
    paddingHorizontal: 6,
    marginTop: 5,
  },
  reviewTabWrapper: {
    backgroundColor: Colors.Alabaster,
    paddingHorizontal: 36,
    marginTop: 10,
  },
  indicatorStyle: {
    backgroundColor: Colors.torchRed,
    height: 4,
  },
  ratingStyle: {paddingVertical: 2},
  photos: {width: 100, height: 98, marginRight: '3%'},
  selectedStyle: {
    borderWidth: 1,
    // borderColor: Colors.torchRed,
    borderColor: Colors.Turquoise,
  },
});
