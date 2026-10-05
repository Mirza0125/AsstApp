import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {
    fontSize: 20,
    position: 'absolute',
    right: 25,
  },
  input: {
    fontSize: 22,
    color: Colors.silverChalice,
  },
  hasInput: {
    fontSize: 22,
    color: Colors.torchRed,
  },
  inputField: {
    height: 53,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    paddingHorizontal: 7,
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
  mainBg: {backgroundColor: Colors.white},
  primaryBg: {
    backgroundColor: Colors.Alabaster,
  },
  tagInput: {
    height: 53,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  tag: {fontSize: 22, color: 'red'},
  notes: {
    height: 100,
    marginTop: 10,
  },
  button: {
    color: Colors.torchRed,
  },
  buttonSize: {
    width: 240,
    marginVertical: 15,
  },
  line: {height: 3, backgroundColor: '#DCE0E5', opacity: 0.5},
});
