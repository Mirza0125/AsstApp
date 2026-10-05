/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import {Colors} from './Variables';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  primary: {
    color: Colors.white,
  },
  primaryBg: {
    backgroundColor: Colors.primary,
  },
  secondaryBg: {
    backgroundColor: Colors.white,
  },
  border: {
    borderWidth: 1,
  },
  borderColor: {
    borderColor: Colors.white,
  },
  borderB: {
    borderBottomWidth: 1,
  },
  borderT: {
    borderTopWidth: 1,
  },
  transparentBg: {
    backgroundColor: 'transparent',
  },
});
