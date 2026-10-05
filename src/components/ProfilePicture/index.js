import React from 'react';

import {View, Image} from 'react-native';

// theme
import {Layout, Images} from 'src/theme';

import styles from './styles';

const {profilePic, image, transparent} = styles;

const ProfilePicture = ({source, camSource}) => {
  const {center} = Layout;

  return (
    <>
      <View style={profilePic}>
        <Image source={source ? source : Images.profile} style={image} />
        <View style={[transparent, center]}>
          <Image source={camSource ? camSource : Images.cam} />
        </View>
      </View>
    </>
  );
};

export default ProfilePicture;
