import {Platform, Alert, Linking} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import {checkMultiplePermissions} from './permissions';

export const checkForPermissions = async () => {
  const permissions =
    Platform.OS === 'ios'
      ? [
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.PHOTO_LIBRARY,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        ]
      : [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ];

  const isPermissionGranted = await checkMultiplePermissions(permissions);
  console.log('isPermissionGranted', isPermissionGranted);
  // if (!isPermissionGranted) {
  //   Alert.alert(
  //     'Permission Request',
  //     'Please check setting for permissions.',
  //     [
  //       {
  //         text: 'Go to Settings',
  //         onPress: () => {
  //           Linking.openSettings();
  //         },
  //       },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // }
  return isPermissionGranted;
};
