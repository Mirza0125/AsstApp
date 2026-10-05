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
    // height: 28,
    resizeMode: 'cover',
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

  line: {height: 3, backgroundColor: '#DCE0E5', opacity: 0.5},
  chatIcon: {
    color: 'white',
    fontSize: 13,
  },
  title: {
    height: 100,
  },

  topWrapper: {marginTop: 36, marginBottom: 23},
  modalTopWrapper: {marginTop: 10, marginBottom: 10},
  modalStyle: {
    padding: 0,
    margin: 0,
  },
  fieldWrapper: {
    fontSize: 14,
    backgroundColor: Colors.white,
  },
  mainWrapper: {
    borderRadius: 8,
    padding: 20,
    marginVertical: 30,
  },
  PicWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  reviewer: {
    width: 46,
    height: 46,
    resizeMode: 'cover',
  },
  locationWrapper: {
    marginTop: 2,
  },
  locationIcon: {
    fontSize: 20,
  },
  modalHeader: {
    backgroundColor: '#F0F0F0',
    height: 47,
  },
  map: {width: '100%', height: 145},
});
