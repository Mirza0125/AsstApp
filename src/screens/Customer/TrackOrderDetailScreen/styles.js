import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {
    fontSize: 20,
  },
  image: {
    width: 107,
    height: 102,
  },
  card: {
    marginTop: 26,
    marginBottom: 24,
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
  input: {
    height: 53,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginBottom: 8,
  },
  tag: {fontSize: 22, color: 'red'},
  note: {
    height: 100,
    backgroundColor: '#F5F5F5',
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  button: {
    color: Colors.torchRed,
  },
  button: {
    width: '100%',
    height: 50,
    marginHorizontal: 80,
    marginTop: 84,
    borderRadius: 6,
    backgroundColor: '#FD1B1B',
  },
  line: {height: 3, backgroundColor: '#DCE0E5', opacity: 0.5},
  chatIcon: {
    color: 'white',
    fontSize: 13,
  },
  title: {
    height: 100,
  },
});
