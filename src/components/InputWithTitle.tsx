import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps} from 'react-native';

interface InputWithTitleProps extends TextInputProps {
  title: string;
}

const InputWithTitle = ({title, ...rest}: InputWithTitleProps) => {
  return (
    <>
      <Text>{title}</Text>
      <TextInput style={styles.input} {...rest} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default InputWithTitle;
