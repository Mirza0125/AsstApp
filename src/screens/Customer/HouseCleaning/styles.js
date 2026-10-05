import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {color: Colors.torchRed, fontSize: 20, marginLeft: 5},
  flexWrap: {flexDirection: 'row', flexWrap: 'wrap'},
  modalStyle: {
    width: '80%',
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    padding: 0,
    margin: 0,
  },
  footer: {
    height: 80,
    backgroundColor: Colors.Alabaster,
    justifyContent: 'center',
  },

  inputWrapper: {
    backgroundColor: Colors.Alabaster,
    borderRadius: 6,
    height: 50,
  },
  button: {
    color: Colors.torchRed,
  },
});
