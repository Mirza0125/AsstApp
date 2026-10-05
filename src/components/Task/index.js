import React from 'react';
import {View, Image} from 'react-native';
import {Icon} from 'native-base';
// components
import Text from '../Text';
// theme
import {Layout, Images, Gutters, Fonts} from 'src/theme';

// styles
import styles from './styles';

const {titleRegular, textLarge, textMedium} = Fonts;
const {row, fill, center, justifyContentBetween, alignItemsCenter} = Layout;
const {smallRMargin, regularLMargin, smallLMargin} = Gutters;
const {reviewer, heartIcon, smallTMargin, PicWrapper, mainWrapper} = styles;

const Task = ({pending, completed, imageUrl, date, time, name, category}) => {
  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: '#fff',
        borderWidth: 0.6,
        borderRadius: 6,
        borderColor: '#F0F0F0',
        shadowColor: '#707070',
        shadowOffset: {
          width: 0,
          height: 0.4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.54,
        elevation: 5,
      }}>
      <View style={[row, fill, mainWrapper, smallTMargin]}>
        <View>
          <Text text={date} bold style={titleRegular} />
          <Text text={time} style={textLarge} />
        </View>
        <View style={[center, regularLMargin]}>
          <View style={[row, alignItemsCenter, smallRMargin]}>
            <View style={[PicWrapper]}>
              <Image
                source={imageUrl ? {uri: imageUrl} : Images.mark}
                style={reviewer}
              />
            </View>
            <View style={smallLMargin}>
              <View style={[row, center, justifyContentBetween]}>
                <Text text={name} bold style={textMedium} />
              </View>
              <Text text={category} bold color="quaternary" />
            </View>
          </View>
        </View>
      </View>
      {pending && (
        <View
          style={[row, {borderWidth: 1, height: 42, borderColor: '#F0F0F0'}]}>
          <View style={[fill, row, center]}>
            <Icon type="FontAwesome5" name="comment-dots" style={heartIcon} />
            <Text text="Message" color="quaternary" style={smallLMargin} />
          </View>
          <View
            style={[
              fill,
              center,
              {borderLeftWidth: 1, borderColor: '#F0F0F0'},
            ]}>
            <Text text="View Detail" color="quinary" />
          </View>
        </View>
      )}
      {completed && (
        <View
          style={[row, {borderWidth: 1, height: 42, borderColor: '#F0F0F0'}]}>
          <View style={[fill, row, center]}>
            <Icon type="FontAwesome5" name="comment-dots" style={heartIcon} />
            <Text text="Feedback" color="quaternary" style={smallLMargin} />
          </View>
          <View
            style={[
              fill,
              center,
              {borderLeftWidth: 1, borderColor: '#F0F0F0'},
            ]}>
            <Text text="Rebook Service" color="quinary" />
          </View>
        </View>
      )}
    </View>
  );
};

export default Task;
