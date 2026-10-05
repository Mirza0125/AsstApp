import {StyleSheet} from 'react-native';
import {Colors} from 'src/theme';
export default StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 0.4,
  },
  picContainer: {
    height: 143,
  },

  indicatorStyle: {
    backgroundColor: Colors.brightSun,
    height: 4,
  },
  input: {
    flex: 1,
    height: 53,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginBottom: 8,
  },
  firstName: {
    flex: 1,
    height: 58,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginBottom: 8,
    marginRight: 0,
  },
  lastName: {
    flex: 1,
    height: 58,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginBottom: 8,
    marginLeft: 5,
  },
  changePassword: {
    marginTop: 22,
    marginBottom: 18,
  },

  note: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  pastService: {
    height: 140,
    //marginVertical: 35,
    backgroundColor: 'white',
  },
  serviceField: {
    height: 67,
    marginHorizontal: 26,
    borderBottomWidth: 0.54,
    borderBottomColor: Colors.silverChalice,
    justifyContent: 'center',
  },
});
