/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  white: '#ffffff',
  red: '#FF0000',
  black: '#000000',
  primary: '#0A0618',
  monza: '#D40041',
  error: '#dc3545',
  torchRed: '#FD1B1B',
  wildSand: '#F5F5F5',
  silverChalice: '#A5A5A5',
  Alabaster: '#F7F7F7',
  doveGray: '#707070',
  brightSun: '#FFCB3B',
  gold: '#C5A636',
  christi: '#28B207',
  green: '#1B6F5B',
  transparentWhite: '#FFFFFF99 0% 0%',
  transparentRed: '#FD1B1B',
  appThemeColor: '#5ce1e6',
  profileImageBGColor: '#D0CFD8',
  textColor: '#274749',
  //Fit
  appThemeColor: '#5ce1e6',
  profileImageBGColor: '#D0CFD8',

  senderTimeColor: 'rgba(79, 7, 79, 1)',
  senderMessageBGColor: 'rgba(92, 225, 230, 1)',
  senderMessageTextColor: 'black',

  receiverTimeColor: 'rgba(79, 7, 79, 1)',
  receiverMessageBGColor: 'rgba(189, 189, 189, 1)',
  receiverMessageTextColor: 'rgba(0, 0, 0, 1)',

  MessageImageTimeBRColor: 'rgba(0, 0, 0, 0.6)',
  //New Design
  Turquoise: '#30D5C8',
};

// map markers
export const lightTheme = {
  locationMarkerBgColor: Colors.transparentRed,
  pickUpLocationMarkerColor: Colors.torchRed,
  dropOffLocationMarkerColor: Colors.green,
};

/**
 * FontSize
 */
export const FontSize = {
  small: 10,
  regular: 12,
  X: 14,
  medium: 16,
  large: 18,
};

/**
 * Metrics Sizes
 */
const tiny = 5; // 5
const small = tiny * 2; // 10
const small2x = small * 2; // 20
const regular = tiny * 3; // 15
const medium = regular * 2; // 30
const mediumX = small2x * 2; // 40
const large = regular * 3; // 45
const largeX = mediumX + regular; // 55
export const MetricsSizes = {
  tiny,
  small,
  small2x,
  regular,
  medium,
  mediumX,
  large,
  largeX,
};
