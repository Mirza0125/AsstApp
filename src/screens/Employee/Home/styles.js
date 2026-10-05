import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  icon: {color: Colors.torchRed, fontSize: 20, marginLeft: 5},
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
  addMore: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: '3%',
  },

  //modal
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
    paddingVertical: 6,
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
    height: 201,
    marginVertical: 30,
    backgroundColor: 'white',
  },
  serviceField: {
    height: 67,
    marginHorizontal: 26,
    borderBottomWidth: 0.54,
    borderBottomColor: Colors.silverChalice,
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
    height: 313,
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
    padding: 0,
    margin: 0,
  },
});
