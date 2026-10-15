import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

interface Props extends TextInputProps {}

const customInput: React.FC<Props> = (props) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor="#382f2f"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
});

export default customInput;