import React, {useEffect, useState} from 'react';
import {View, Image, useWindowDimensions, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Icon} from 'native-base';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
// components
import {Text, Task, Line} from 'src/components';

// //actions
// import {getEmployeeData} from './redux/actions';

// theme
import {Layout, Images, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const PendingTaskScreen = (props) => {
  //   const {
  //     requesting,
  //     ServicesProfile,
  //     navigation: {navigate},
  //   } = props;

  //   useEffect(() => {
  //     props.getEmployeeData();
  //   }, []);
  const FirstRoute = () => (
    <Content
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[mediumHPadding, mainBg, wrapper, mediumBPadding]}>
      <View style={{flex: 1}}>
        <Task
          pending
          date="Mar 12"
          time="6:30 PM"
          name="Anne Glim"
          category="HOUSE CLEANING"
        />
      </View>
    </Content>
  );

  const SecondRoute = () => (
    <Content
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[mediumHPadding, mainBg, wrapper, mediumBPadding]}>
      <View style={{flex: 1}}>
        <Task
          completed
          date="Mar 12"
          time="6:30 PM"
          name="Anne Glim"
          category="HOUSE CLEANING"
        />
      </View>
    </Content>
  );

  const dimensions = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Pending (1)'},
    {key: 'second', title: 'Completed (1)'},
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={indicatorStyle}
      style={{backgroundColor: 'white'}}
      activeColor={Colors.torchRed}
      inactiveColor={Colors.black}
      labelStyle={{fontWeight: 'bold'}}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const {titleRegular} = Fonts;
  const {row, alignItemsCenter, justifyContentCenter} = Layout;
  const {mediumHPadding, mediumBPadding, mediumVPadding} = Gutters;
  const {icon, indicatorStyle, mainBg, wrapper} = styles;

  return (
    <Container style={mainBg}>
      <View
        style={[
          row,
          alignItemsCenter,
          justifyContentCenter,
          mediumHPadding,
          mediumVPadding,
          mainBg,
        ]}>
        {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}
        <Icon type="FontAwesome5" name="arrow-left" style={icon} />
        <Text text="Task" bold color="quaternary" style={titleRegular} />
      </View>
      <Line />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: dimensions.width}}
        renderTabBar={renderTabBar}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PendingTaskScreen);
