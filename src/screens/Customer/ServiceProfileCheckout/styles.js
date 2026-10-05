import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {fontSize: 20, position: 'absolute', left: 25},
  goBack: {
    fontSize: 20,
  },
  image: {
    width: 107,
    height: 102,
  },
  heartIcon: {
    color: Colors.torchRed,
    fontSize: 16,
  },
  message: {
    width: 121,
    height: 28,
    resizeMode: 'contain',
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
    marginVertical: 25,
  },
  servicesTabWrapper: {
    backgroundColor: Colors.Alabaster,
    paddingHorizontal: 20,
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
  checked: {height: 90},
  title: {marginTop: 25, marginBottom: 17},
});
