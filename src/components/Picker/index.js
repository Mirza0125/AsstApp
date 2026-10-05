import React, {useEffect, useState} from 'react';
import {TouchableOpacity, ScrollView, Text, View} from 'react-native';
const Picker = (items, value, selectedValue) => {
  const [on, setOn] = useState(false);
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'column',
        height: 40,
        backgroundColor: '#fff',
      }}
      onPress={() => setOn(!on)}>
      {on &&
        items &&
        items.map((item) => {
          return (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text>{item.name}</Text>
            </ScrollView>
          );
        })}
    </TouchableOpacity>
  );
};
export default Picker;
