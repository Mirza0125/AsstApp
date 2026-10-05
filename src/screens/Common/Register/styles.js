import {StyleSheet} from 'react-native';
import {Colors, Gutters} from 'src/theme';

export default StyleSheet.create({
  icon: {
    fontSize: 20,
    color: Colors.brightSun,
  },
  checkbox: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  activityIndicatorWrapper: {
    paddingTop: 70,
  },
  chevron: {
    color: '#000',
  },
  inputWrapper: {
    backgroundColor: Colors.Alabaster,
    borderRadius: 6,
  },
  petContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  countContainer: {
    flexDirection: 'row',
  },
  modalBody: {
    backgroundColor: 'white',
    paddingHorizontal: 36,
    paddingBottom: 36,
  },
  modal: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  decrementButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#DADADA',
    borderWidth: 1,
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  counterTextContainer: {
    width: 38,
    height: 38,
    borderColor: '#DADADA',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontSize: 18,
  },
  incrementButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#DADADA',
    borderRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
