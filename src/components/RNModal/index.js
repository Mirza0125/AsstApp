import React from 'react';
import Modal from 'react-native-modal';

import Text from '../Text';

// styles
import styles from './styles';
import {Images, Gutters, Layout, Global} from '../../theme';
import {View} from 'react-native';

const {fill} = Layout;
const {modalView} = styles;
const RNModal = ({
  modalVisible,
  onBackButtonPress,
  animationInTiming,
  animationOutTiming,
  animationIn,
  animationOut,
  children,
  style,
  onBackDropPress,
}) => {
  return (
    <>
      <Modal
        visible={modalVisible}
        animationIn={animationIn}
        animationInTiming={animationInTiming}
        animationOut={animationOut}
        animationOutTiming={animationOutTiming}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackDropPress}
        style={style}>
        {children}
      </Modal>
    </>
  );
};

export default RNModal;
