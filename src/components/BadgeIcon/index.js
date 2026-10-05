import React from 'react';
import {connect} from 'react-redux';
import {Text} from 'src/components';
import {View} from 'react-native';
const BadgeIcon = (props) => {
  const {unreadCount} = props;
  return (
    <>
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: 'red',
          position: 'absolute',
          top: -15,
          left: 15,
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  unreadCount: state.unreadCount.unreadCount,
});

export default connect(mapStateToProps)(BadgeIcon);
