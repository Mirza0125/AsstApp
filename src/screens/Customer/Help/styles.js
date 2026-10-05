import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  picContainer: {
    height: 143,
    marginBottom: 22,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  transparent: {
    top: -38,
    right: 6,
    width: 114,
    height: 38,
    opacity: 0.6,
    backgroundColor: '#707070',
  },
  inputField: {
    backgroundColor: '#fff',
    height: 196,
    paddingLeft: 25,
    paddingRight: 46,
    paddingTop: 25,
    paddingBottom: 8,
  },
  info: {
    marginLeft: 19,
    paddingTop: 4,
    paddingBottom: 10,
  },
  firstName: {
    height: 50,
    backgroundColor: Colors.Alabaster,
    borderRadius: 5,
  },
  email: {
    height: 50,
    marginTop: 8,
    backgroundColor: Colors.Alabaster,
    borderRadius: 5,
  },
  changePassword: {
    marginTop: 22,
    marginBottom: 18,
  },
  pastService: {
    // height: 201,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  serviceField: {
    height: 67,
    marginHorizontal: '10%',
    borderBottomWidth: 0.54,
    borderBottomColor: '#F1F1F1',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
  giftCard: {
    height: 53,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  inputFieldTwo: {
    backgroundColor: '#fff',
    // height: 313,
    paddingLeft: 25,
    paddingRight: 46,
    paddingTop: 25,
    paddingBottom: 8,
    marginTop: 25,
  },
  modal: {
    top: '50%',

    backgroundColor: 'red',
  },
  fieldWrapper: {
    fontSize: 14,
    backgroundColor: Colors.white,
  },
  modalStyle: {
    // padding: 0,
    margin: 0,
  },
});
