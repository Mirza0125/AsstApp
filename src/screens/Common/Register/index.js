import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Content, Icon, Container, Picker} from 'native-base';
import {View, TouchableOpacity, Platform, Image} from 'react-native';
// components
import {CheckBox} from 'react-native-elements';
import {
  Text,
  Button,
  Input,
  Error,
  LuckyHeader,
  RNModal,
} from '../../../components';
import {Layout, Fonts, Gutters} from 'src/theme';
// import {Picker} from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';

//action
import {register, resetServerError} from './redux/actions';

// hooks
import useForm from 'src/hooks/useForm';

// utils
import validator from 'src/utils/validation';

// styles
import styles from './styles';
import {Images} from '../../../theme';
import {getScreenWidth} from '../../../utils/getDeviceInfo';
import {styled} from '@ui-kitten/components';

const Register = (props) => {
  const {requesting, serverErrors, navigation} = props;
  const {navigate} = navigation;
  const screenModes = {building: 0, personal: 1};

  const [checked, setChecked] = useState(false);
  const [counts, setCounts] = useState({Dog: 0, Cat: 0, Other: 0});
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [screenMode, setScreenMode] = useState(screenModes.building);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [role, setRole] = useState('employee');
  const {row, fill} = Layout;

  const toggleModal = (value) => () => {
    setModalVisible(value);
  };

  const updateCount = (key, direction) => () => {
    setCounts({...counts, [key]: counts[key] + direction});
  };

  const stateSchema = {
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
    confirm_password: {
      value: '',
      error: '',
    },
    name: {
      value: '',
      error: '',
    },
    zip_code: {
      value: '',
      error: '',
    },
    property_name: {
      value: '',
      error: '',
    },
    floor_plan: {
      value: '',
      error: '',
    },
    building_number: {
      value: '',
      error: '',
    },
    unit_number: {
      value: '',
      error: '',
    },
    refferer: {
      value: '',
      error: '',
    },
    phone_number: {
      value: '',
      error: '',
    },
  };
  const validationStateSchema = {
    email: {
      required: true,
      validator: validator.email,
    },
    password: {
      required: true,
    },
    confirm_password: {
      required: true,
      validator: {
        compare: (value) => value !== state.password.value,
        error: "Your passwords didn't match.",
      },
    },
    name: {
      required: true,
      validator: validator.name,
    },
    zip_code: {
      required: true,
    },
    property_name: {
      required: true,
    },
    floor_plan: {
      required: true,
    },
    building_number: {
      required: true,
    },
    unit_number: {
      required: true,
    },
    refferer: {
      required: false,
    },
    phone_number: {
      required: true,
    },
  };

  const validationStateSchema2 = {
    zip_code: {
      required: true,
    },
    property_name: {
      required: true,
    },
    floor_plan: {
      required: true,
    },
    building_number: {
      required: true,
    },
    unit_number: {
      required: true,
    },
  };

  useEffect(() => {
    props.resetServerError();
    return () => {
      props.resetServerError();
    };
  }, []);

  const submitForm = () => {
    console.log('here submit form');
    const data = {
      first_name: state.name.value,
      last_name: state.name.value,
      email: state.email.value,
      password: state.password.value,
      role: role,
      term_and_condition: true,
      building_number: state.building_number.value,
      unit_number: state.unit_number.value,
      zip_code: state.zip_code.value,
      dog: counts.Dog,
      cat: counts.Cat,
      other: counts.Other,
      role: 'resident',
      floor_plan: state.floor_plan.value,
    };

    debugger;
    props.register(data);

    let fb = 'fb.';
    let fbEmail = fb.concat(data.email);
    console.log('fbEmail', fbEmail);
    // auth()
    //   .createUserWithEmailAndPassword(fbEmail, data.password)
    //   .then((user) => {
    //     console.log('User account created & signed in!', user);
    //   })
    //   .catch((error) => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }
    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }
    //     console.error(error);
    //   });
  };

  const {state, handleOnChange, disable} = useForm(
    stateSchema,
    validationStateSchema,
  );

  const {state2, handleOnChange2, disable2} = useForm(
    stateSchema,
    validationStateSchema2,
  );

  const {
    mediumHPadding,
    smallBMargin,
    mediumXVMargin,
    regularBMargin,
    small2xVMargin,
    smallVPadding,
    mediumXTMargin,
  } = Gutters;
  const {textLarge} = Fonts;
  console.log('serverErrors', serverErrors);

  const onBack = () => {
    if (screenMode === 0) {
      navigation.goBack();
      return;
    }
    setScreenMode(0);
  };

  const onContinue = () => {
    setScreenMode(1);
  };

  return (
    <Container>
      <Content
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: '#fff',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 10,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOpacity: 1,
          }}>
          <LuckyHeader
            title={'Sign up'}
            titleStyle={{fontWeight: '700', fontSize: 24}}
            onPress={onBack}
            left={
              <Image
                source={Images.arrowleft}
                style={{width: 15, height: 15}}
              />
            }
          />
        </View>
        <View style={mediumHPadding}>
          {screenMode === 1 ? (
            <View style={[fill]}>
              <Text
                text="Personal Information"
                color="primary"
                style={[textLarge, small2xVMargin]}
              />
              <View style={smallBMargin}>
                <Input
                  placeholder="Name"
                  showHint
                  value={state.name.value}
                  onChangeText={(value) => handleOnChange('name', value)}
                />
                {state.name.error ? (
                  <Text style={{color: 'red'}}>*{state.name.error}</Text>
                ) : null}
              </View>

              <View style={smallBMargin}>
                <Input
                  placeholder="Phone Number"
                  showHint
                  value={state.phone_number.value}
                  onChangeText={(value) =>
                    handleOnChange('phone_number', value)
                  }
                />
                {state.phone_number.error ? (
                  <Text style={{color: 'red'}}>
                    *{state.phone_number.error}
                  </Text>
                ) : null}
              </View>

              <View style={smallBMargin}>
                <Input
                  placeholder="Email"
                  showHint
                  value={state.email.value}
                  onChangeText={(value) => handleOnChange('email', value)}
                />
                {state.email.error ? (
                  <Text style={{color: 'red'}}>*{state.email.error}</Text>
                ) : null}
              </View>

              <Button
                text="Add Pets"
                color="primary"
                block
                icon={'chevron-right'}
                style={[mediumXTMargin, {width: '50%'}]}
                onPress={toggleModal(true)}
              />

              <RNModal
                modalVisible={modalVisible}
                onBackDropPress={toggleModal(false)}
                style={styles.modal}>
                <View style={styles.modalBody}>
                  <Text
                    text="Add Pet"
                    color="primary"
                    style={[
                      textLarge,
                      smallVPadding,
                      {
                        backgroundColor: '#F0F0F0',
                        width: getScreenWidth(),
                        alignSelf: 'center',
                        textAlign: 'center',
                        marginBottom: 32,
                      },
                      mediumHPadding,
                    ]}
                  />
                  {Object.entries(counts).map(([key, value]) => (
                    <View style={styles.petContainer} key={key}>
                      <Text text={key} style={[textLarge]} />

                      <View style={styles.countContainer}>
                        <Button
                          text="-"
                          style={styles.decrementButton}
                          color="primary"
                          onPress={updateCount(key, -1)}
                          disabled={value === 0}
                        />
                        <View style={styles.counterTextContainer}>
                          <Text text={`${value}`} style={styles.counterText} />
                        </View>
                        <Button
                          text="+"
                          color="primary"
                          style={styles.incrementButton}
                          onPress={updateCount(key, 1)}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </RNModal>

              <Text
                text="Create Password"
                color="primary"
                style={[textLarge, small2xVMargin]}
              />

              <View style={smallBMargin}>
                <Input
                  placeholder="Create Password"
                  showHint
                  value={state.password.value}
                  onPress={() => setPasswordShown(!passwordShown)}
                  onChangeText={(value) => handleOnChange('password', value)}
                  password
                />
                {state.password.error ? (
                  <Text style={{color: 'red'}}>*{state.password.error}</Text>
                ) : null}
              </View>
              <View style={regularBMargin}>
                <Input
                  placeholder="Confirm Password"
                  value={state.confirm_password.value}
                  showHint
                  onPress={() => setConfirmPasswordShown(!confirmPasswordShown)}
                  onChangeText={(value) =>
                    handleOnChange('confirm_password', value)
                  }
                  password
                />
                {state.confirm_password.error ? (
                  <Text style={{color: 'red'}}>
                    *{state.confirm_password.error}
                  </Text>
                ) : null}
              </View>

              <View style={[smallBMargin]}>
                <Picker
                  iosIcon={
                    <Icon
                      name="chevron-right"
                      type="Entypo"
                      style={{fontSize: 25}}
                    />
                  }
                  placeholder="How did you hear about us?"
                  iosHeader="Select One"
                  style={[
                    {
                      backgroundColor: '#f7f7f7',
                      width: '100%',
                      borderRadius: 4,
                      height: 54,
                    },
                    smallBMargin,
                  ]}
                  selectedValue={state.refferer.value}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) =>
                    handleOnChange('refferer', itemValue)
                  }>
                  <Picker.Item label="Facebook" value="Facebook" />
                  <Picker.Item label="Google" value="Google" />
                  <Picker.Item label="LinkedIn" value="LinkedIn" />
                  <Picker.Item label="Twitter" value="Twitter" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>

                {/* <Input
                  placeholder="How did you hear about us?"
                  showHint
                  icon="chevron-right"
                  iconColor={styles.chevron.color}
                  value={state.refferer.value}
                  onChangeText={(value) => handleOnChange('refferer', value)}
                /> */}
                {state.refferer.error ? (
                  <Text style={{color: 'red'}}>*{state.refferer.error}</Text>
                ) : null}
              </View>

              {/* <View style={[center, row]}>
                <CheckBox
                  containerStyle={checkbox}
                  textStyle={textRegular}
                  checked={checked}
                  checkedColor="black"
                  onPress={() => setChecked(!checked)}
                />
                <Text text="I agree to the  Prompt " style={textRegular} />
                <TouchableOpacity onPress={() => navigate('TermsAndCondition')}>
                  <Text
                    text="terms and conditions"
                    style={[textRegular, {textDecorationLine: 'underline'}]}
                  />
                </TouchableOpacity>
              </View> */}
              <Button
                text="Create Account"
                color="primary"
                block
                style={[mediumXTMargin]}
                loading={requesting}
                disabled={disable}
                onPress={submitForm}
              />
            </View>
          ) : (
            <>
              <Text
                text="Let’s see if we service your area"
                color="primary"
                style={[textLarge, small2xVMargin]}
              />
              {serverErrors ? (
                <Error errorText={String(serverErrors).toUpperCase()} />
              ) : null}

              <View style={smallBMargin}>
                <Input
                  placeholder="Zip Code"
                  showHint
                  value={state.zip_code.value}
                  onChangeText={(value) => handleOnChange('zip_code', value)}
                />
                {state.zip_code.error ? (
                  <Text style={{color: 'red'}}>*{state.zip_code.error}</Text>
                ) : null}
              </View>

              <Text
                text="Configure your home details"
                color="primary"
                style={[
                  textLarge,
                  smallVPadding,
                  mediumXVMargin,
                  {
                    backgroundColor: '#F0F0F0',
                    width: getScreenWidth(),
                    alignSelf: 'center',
                  },
                  mediumHPadding,
                ]}
              />

              <View style={smallBMargin}>
                <Picker
                  iosIcon={
                    <Icon
                      name="chevron-right"
                      type="Entypo"
                      style={{fontSize: 25}}
                    />
                  }
                  placeholder="Select Property Name"
                  iosHeader="Select Property"
                  style={[
                    {
                      backgroundColor: '#f7f7f7',
                      width: '100%',
                      borderRadius: 4,
                      height: 54,
                    },
                    smallBMargin,
                  ]}
                  selectedValue={state.property_name.value}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) =>
                    handleOnChange('property_name', itemValue)
                  }>
                  <Picker.Item label="ABC" value="ABC" />
                  <Picker.Item label="XYZ" value="XYZ" />
                  <Picker.Item label="ANY" value="ANY" />
                </Picker>
                {state.property_name.error ? (
                  <Text style={{color: 'red'}}>
                    *{state.property_name.error}
                  </Text>
                ) : null}
              </View>
              <View style={smallBMargin}>
                <Picker
                  iosIcon={
                    <Icon
                      name="chevron-right"
                      type="Entypo"
                      style={{fontSize: 25}}
                    />
                  }
                  placeholder="Select Floor Plan"
                  iosHeader="Select Floor Plan"
                  style={[
                    {
                      backgroundColor: '#f7f7f7',
                      width: '100%',
                      borderRadius: 4,
                      height: 54,
                    },
                    smallBMargin,
                  ]}
                  selectedValue={state.floor_plan.value}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) =>
                    handleOnChange('floor_plan', itemValue)
                  }>
                  <Picker.Item label="Plan A" value="planA" />
                  <Picker.Item label="Plan B" value="planB" />
                  <Picker.Item label="Plan C" value="planC" />
                </Picker>

                {/* <Input
                  placeholder="Floor Plan"
                  showHint
                  icon="chevron-right"
                  iconColor={styles.chevron.color}
                  value={state.floor_plan.value}
                  onChangeText={(value) => handleOnChange('floor_plan', value)}
                /> */}
                {state.floor_plan.error ? (
                  <Text style={{color: 'red'}}>*{state.floor_plan.error}</Text>
                ) : null}
              </View>

              <View style={[row, smallBMargin]}>
                <View style={{flex: 1, marginRight: 15}}>
                  <Input
                    placeholder="Building Number"
                    showHint
                    value={state.building_number.value}
                    onChangeText={(value) =>
                      handleOnChange('building_number', value)
                    }
                  />
                  {state.building_number.error ? (
                    <Text style={{color: 'red'}}>
                      *{state.building_number.error}
                    </Text>
                  ) : null}
                </View>
                <View style={{flex: 1}}>
                  <Input
                    placeholder="Unit number"
                    showHint
                    value={state.unit_number.value}
                    onChangeText={(value) =>
                      handleOnChange('unit_number', value)
                    }
                  />
                  {state.unit_number.error ? (
                    <Text style={{color: 'red'}}>
                      *{state.unit_number.error}
                    </Text>
                  ) : null}
                </View>
              </View>

              <Button
                text="Continue"
                color="primary"
                block
                disabled={
                  state.unit_number.value === '' ||
                  state.building_number.value === '' ||
                  state.floor_plan.value === '' ||
                  state.property_name.value === '' ||
                  state.zip_code.value === ''
                }
                style={{marginTop: 40}}
                loading={requesting}
                onPress={onContinue}
              />
            </>
          )}
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.register.requesting,
  serverErrors: state.register.serverErrors,
});

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(register(data)),
  resetServerError: () => dispatch(resetServerError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
