import React, {useRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Image, StyleSheet, StatusBar, Dimensions} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Button, Text} from '../../../components';

//Actions
import {getOnBoardData} from './redux/actions';
const {height} = Dimensions.get('window');
const data = [
  {
    title: 'Fast and Easy',
    text: 'There is no better advertisement \ncampaign that’s is low and also successful \nat the same time. Great business ideas.',
    image: require('src/assets/images/cleaning.png'),
  },
  {
    title: 'Customise your appearance',
    text: 'There is no better advertisement \ncampaign that’s is low and also successful \nat the same time. Great business ideas.',
    image: require('src/assets/images/appearance.png'),
  },
  {
    title: 'Control over your schedule',
    text: 'There is no better advertisement \ncampaign that’s is low and also successful \nat the same time. Great business ideas.',
    image: require('src/assets/images/wallcleaning.png'),
  },
];

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    // backgroundColor:'#ffff'
  },
  image: {
    width: '100%',
    height: (200 / 375) * height,
  },
  text: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 16,
    marginBottom: 40,
    paddingHorizontal: 58,
  },
  title: {
    marginVertical: 25,
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 22,
  },
});

const OnBoard = (props) => {
  const {
    onBoardData,
    navigation: {navigate},
  } = props;
  const slider = useRef();
  const [count, setCount] = useState(0);
  const [newdata, setData] = useState([]);

  const goToSilde = () => {
    setCount(count + 1);
    slider.current.goToSlide(count, true);
  };

  useEffect(() => {
    props.getOnBoardData();
  }, []);

  useEffect(() => {
    let array = [];
    onBoardData &&
      onBoardData.map((d) => {
        array.push({
          title: d.title,
          text: d.description,
          image: d.image,
        });
      });
    setData(array);
  }, [onBoardData]);

  const renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          //   {
          //     backgroundColor: item.bg,
          //   },
        ]}>
        <View>
          <Image source={{uri: item.image}} style={styles.image} />
          <Text
            style={{
              position: 'absolute',
              zIndex: 1,
              bottom: 20,
              left: 120,
              color: 'white',
              fontSize: 32,
              fontFamily: 'CrimsonText-Bold',
            }}
            text="Lucky Moon"
          />
        </View>
        <Text bold style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <Button
        text="Next"
        color="primary"
        block
        style={{width: 240, alignSelf: 'center'}}
        onPress={() => goToSilde()}
      />
    );
  };

  const renderDoneButton = () => {
    return (
      <Button
        block
        text="Done"
        color="primary"
        style={{width: 240, alignSelf: 'center'}}
        onPress={() => navigate('Login')}
      />
    );
  };

  const keyExtractor = (item) => item.title;
  return (
    <>
      <View style={{flex: 1}}>
        {/* <StatusBar backgroundColor="#ffff" barStyle="dark-content" /> */}
        <AppIntroSlider
          data={newdata}
          bottomButton={true}
          showNextButton={true}
          showDoneButton={true}
          showSkipButton={false}
          showPrevButton={false}
          ref={(ref) => (slider.current = ref)}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          renderNextButton={renderNextButton}
          renderDoneButton={renderDoneButton}
          activeDotStyle={{backgroundColor: '#FFCB3B'}}
          dotStyle={{backgroundColor: '#A5A5A5'}}
        />
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  onBoardData: state.onBoardData.onBoardData,
});
const mapDispatchToProps = (dispatch) => ({
  getOnBoardData: () => dispatch(getOnBoardData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OnBoard);
