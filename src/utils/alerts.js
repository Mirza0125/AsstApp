import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export const errorAlert = (err) => {
  Alert.alert('Error', err, [{text: 'OK'}], {
    cancelable: false,
  });
};

export const successAlert = (msg) => {
  Alert.alert('Congratulations!', msg, [{text: 'OK'}], {
    cancelable: false,
  });
};

export const showMessageSuccess = (msg) => {
  showMessage({
    message: msg,
    type: 'success',
  });
};

export const showMessageFailure = (msg) => {
  showMessage({
    message: msg,
    type: 'danger',
  });
};
