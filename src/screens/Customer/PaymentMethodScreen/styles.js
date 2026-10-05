import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {
    fontSize: 20,
    position: 'absolute',
    left: 0,
  },
  line: {height: 3, backgroundColor: '#DCE0E5', opacity: 0.5},
  mainBg: {
    backgroundColor: Colors.white,
  },
  primaryBg: {
    backgroundColor: Colors.Alabaster,
  },
  wrapper: {
    backgroundColor: Colors.white,
    marginTop: 5,
  },

  textWrapper: {
    padding: 22,
  },
  masterCardWrapper: {
    borderRadius: 8,
    marginTop: 10,
  },
  mastercard: {
    width: 55,
    height: 37,
  },
  button: {
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  check: {
    position: 'absolute',
    right: 20,
    top: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texts: {
    fontSize: 16,
    color: Colors.torchRed,
    marginHorizontal: 10,
  },
  visacardWrapper: {
    marginTop: 35,
  },
  buttonText: {
    color: Colors.torchRed,
  },
});
