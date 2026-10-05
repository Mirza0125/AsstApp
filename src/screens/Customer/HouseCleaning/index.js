import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Icon, Picker} from 'native-base';
// import {Picker} from '@react-native-picker/picker';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
// components
import {
  Text,
  Button,
  RNModal,
  ProfileCard,
  LuckyHeader,
  DataAvailability,
} from '../../../components';

//actions
import {selectProfile, filterServices} from './redux/actions';

// theme
import {Layout, Gutters, Colors, Fonts} from 'src/theme';

// styles
import styles from './styles';

const HouseCleaning = (props) => {
  const {
    requesting,
    selectService,
    route: {
      params: {service},
    },
    navigation: {navigate},
    filterResult,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(false);
  const [selectedAlphabetical, setSelectedAlphabetical] = useState(false);
  const [selectedRepeatedCustomer, setSelectedRepeatedCustomer] =
    useState(false);

  const onSelectProfile = (item) => {
    console.log('item', item);
    console.log('service', service);
    props.selectProfile(item.id);
  };

  const onApplyFilter = () => {
    props.filterServices(
      service.id,
      selectedAlphabetical,
      selectedRating,
      selectedRepeatedCustomer,
    );
    setModalVisible(false);
    // props.filterServices(
    //   service.id,
    //   selectedAlphabetical,
    //   selectedRating,
    //   selectedRepeatedCustomer,
    // );
  };

  const onPressReset = () => {
    setSelectedAlphabetical('');
    setSelectedRating('');
    setSelectedRepeatedCustomer('');
  };

  const {titleSmall, textMedium} = Fonts;
  const {row, fill, justifyContentBetween, alignItemsEnd} = Layout;
  const {
    mediumHPadding,
    mediumVMargin,
    smallRMargin,
    smallVMargin,
    mediumLPadding,
    smallLMargin,
    smallBMargin,
    largeBPadding,
  } = Gutters;
  const {footer, button, flexWrap, modalStyle, inputWrapper} = styles;

  return (
    <>
      <SafeAreaView style={fill}>
        <Container>
          <LuckyHeader
            left={
              <Icon type="FontAwesome5" name="arrow-left" style={titleSmall} />
            }
            title={
              <Text
                text={service.name}
                color="quaternary"
                bold
                style={titleSmall}
              />
            }
            right={
              <Icon type="FontAwesome" name="filter" style={[titleSmall]} />
            }
            onPress={() => props.navigation.goBack()}
            action={() => setModalVisible(true)}
          />
          <View
            style={[
              fill,
              {backgroundColor: Colors.Alabaster, paddingHorizontal: 8},
            ]}>
            <Content showsVerticalScrollIndicator={false}>
              {/* <StatusBar
                backgroundColor={Colors.white}
                barStyle="dark-content"
              /> */}
              <View style={[row, mediumVMargin]}>
                <Text text="Available  " bold style={textMedium} />
                <Text
                  text={`(${selectService && selectService.length})`}
                  boldq
                  color="quaternary"
                  style={textMedium}
                />
              </View>
              <View />
              <View style={fill}>
                <DataAvailability
                  requesting={requesting}
                  hasData={Boolean([selectService, filterResult])}
                  style={{width: '100%', height: 150}}>
                  <View style={[row, smallBMargin, flexWrap]}>
                    {filterResult
                      ? filterResult.map((item, i) => (
                          <View style={smallLMargin} key={i}>
                            <ProfileCard
                              source={{uri: item.photo}}
                              text={item.name}
                              rating={item.review}
                              onPress={() => onSelectProfile(item)}
                            />
                          </View>
                        ))
                      : selectService &&
                        selectService.map((item, i) => (
                          <View style={{marginLeft: 5.5}} key={i}>
                            <ProfileCard
                              source={{uri: item.photo}}
                              text={item.name}
                              rating={item.review}
                              onPress={() => onSelectProfile(item)}
                            />
                          </View>
                        ))}
                  </View>
                </DataAvailability>
              </View>
            </Content>
          </View>
        </Container>
      </SafeAreaView>
      <RNModal
        modalVisible={modalVisible}
        animationIn="slideInRight"
        animationInTiming={500}
        animationOut="slideOutRight"
        animationOutTiming={800}
        onBackButtonPress={() => setModalVisible(false)}
        onPress={() => setModalVisible(false)}
        style={modalStyle}>
        <SafeAreaView style={[fill]}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={[footer, mediumLPadding]}>
              <Text
                text="Select Sort"
                bold
                color="quaternary"
                style={titleSmall}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={[fill]}>
            <View style={[mediumHPadding, fill]}>
              <View style={smallVMargin}>
                <Text text="Rating" bold style={[textMedium, smallVMargin]} />
                <View
                  style={[
                    inputWrapper,
                    // Platform.OS === 'ios' && {backgroundColor: null},
                  ]}>
                  <Picker
                    // style={{height: 95}}
                    placeholder="Select Value"
                    selectedValue={selectedRating}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedRating(itemValue)
                    }>
                    <Picker.Item
                      label="Highest to lowest"
                      value="Highest to lowest"
                    />
                    <Picker.Item
                      label="Lowest to highest"
                      value="Lowest to highest"
                    />
                    <Picker.Item label="None" value="" />
                  </Picker>
                </View>
              </View>

              <View style={smallVMargin}>
                <Text
                  text="Alphabetical"
                  bold
                  style={[textMedium, smallVMargin]}
                />
                <View
                  style={[
                    inputWrapper,
                    // Platform.OS === 'ios' && {backgroundColor: null},
                  ]}>
                  <Picker
                    // style={{height: 95}}
                    mode="dropdown"
                    placeholder="Select Value"
                    selectedValue={selectedAlphabetical}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedAlphabetical(itemValue)
                    }
                    // style={
                    //   {borderWidth: 1},
                    //   Platform.OS === 'ios' && {borderWidth: 0}
                    // }
                  >
                    <Picker.Item label="A to z" value="A to z" />
                    <Picker.Item label="Z to a" value="Z to a" />
                    <Picker.Item label="None" value="" />
                  </Picker>
                </View>
              </View>

              <View style={[smallVMargin]}>
                <Text
                  text="Repeated Customers"
                  bold
                  style={[textMedium, smallVMargin]}
                />
                <View
                  style={[
                    inputWrapper,
                    // Platform.OS === 'ios' && {backgroundColor: null},
                  ]}>
                  <Picker
                    // style={{height: 95}}
                    mode="dropdown"
                    placeholder="Select Value"
                    selectedValue={selectedRepeatedCustomer}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedRepeatedCustomer(itemValue)
                    }
                    // style={{borderWidth: 1}}
                  >
                    <Picker.Item
                      label="Highest to lowest"
                      value="Highest to lowest"
                    />
                    <Picker.Item
                      label="Lowest to highest"
                      value="Lowest to highest"
                    />
                    <Picker.Item label="None" value="" />
                  </Picker>
                </View>
              </View>
            </View>
            <View style={[row, alignItemsEnd, largeBPadding, mediumHPadding]}>
              <View style={fill}>
                <Button
                  text="Reset"
                  color="secondary"
                  style={[smallRMargin]}
                  textStyle={button}
                  redBorder
                  block
                  onPress={() => onPressReset()}
                />
              </View>
              <View style={fill}>
                <Button
                  color="primary"
                  text="Apply"
                  block
                  onPress={() => onApplyFilter()}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </RNModal>
    </>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.home.requesting,
  selectService: state.home.selectService,
  filterResult: state.profile.filterResult,
});

const mapDispatchToProps = (dispatch) => ({
  selectProfile: (id) => dispatch(selectProfile(id)),
  filterServices: (id, alphabetical, rating, repeated) =>
    dispatch(filterServices(id, alphabetical, rating, repeated)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseCleaning);
