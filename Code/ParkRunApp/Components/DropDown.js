import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text } from 'react-native';

// googlad fram vet knappt hur den funkar 

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState('option1'); // Set initial value to 'option1'
  const placeholder = {
    label: 'Choose a volounteer',
    value: null,
  };
  const options = [
    { label: 'Göran Göransson', value: 'option1' },
    { label: 'Leif', value: 'option2' },
    { label: 'Karin', value: 'option3' },
  ];
  return (
    <View>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => setSelectedValue(value)}
        value={selectedValue}
      />
    </View>
  );
};

export default Dropdown;
