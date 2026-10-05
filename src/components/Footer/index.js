import React, {useState} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {Footer as NBFooter, FooterTab} from 'native-base';

// services
import {navigate} from 'src/navigator/NavigationService';

// components
import Text from '../Text';
import {Global, Gutters, Images} from 'src/theme';

// styles
import styles from './styles';

const Footer = ({
  activeRoute,
  navigation: {navigate, replace},
  exerciseProp,
  light,
}) => {
  const {touch, footer} = styles;
  const {transparentBg} = Global;
  const {smallVPadding} = Gutters;

  const routes = [
    {
      image: 'home',
      text: 'Home',
      route: 'Dashboard',
    },
    {
      image: 'goals',
      text: 'Goals',
      route: 'GoalScreen',
    },
    {
      image: 'stats',
      text: 'Stats',
      route: 'StatScreen',
    },
    {
      image: 'activities',
      text: 'Activity',
      route: 'ActivitiesScreen',
    },
    {
      image: exerciseProp ? 'exercises' : 'more',
      text: exerciseProp ? 'Exercises' : 'More',
      route: exerciseProp ? 'SmileExercises' : 'MoreScreen',
    },
  ];
  const onPress = (route) => {
    if (activeRoute === 'Home') {
      navigate(route);
    } else {
      replace(route);
    }
  };

  return (
    <NBFooter style={[transparentBg, footer]}>
      <FooterTab style={transparentBg}>
        {routes.map((screen, i) => (
          <TouchableOpacity
            key={i}
            style={touch}
            onPress={() => onPress(screen.route)}>
            {light ? (
              <Image
                source={
                  Images[
                    `${screen.image}${
                      activeRoute === screen.text ? 'dark' : 'light'
                    }`
                  ]
                }
              />
            ) : (
              <Image
                source={
                  Images[
                    `${screen.image}${
                      activeRoute === screen.text ? 'dark' : 'light'
                    }`
                  ]
                }
              />
            )}
            <Text
              text={screen.text}
              color={activeRoute === screen.text ? 'golden' : 'riverbed'}
              medium
              style={smallVPadding}
            />
          </TouchableOpacity>
        ))}
      </FooterTab>
    </NBFooter>
  );
};

export default Footer;
