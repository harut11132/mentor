import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

interface ValidationError {
  key: string;
  params: object;
}

interface ValidationProps {
  error?: string | ValidationError;
  children?: React.ReactChild | React.ReactChild[];
  hideError?: boolean;
}

const Validation = (props: ValidationProps) => {
  const {children, error = '', hideError = false} = props;

  const shouldShowError = !hideError && !!error;

  return (
    <View>
      {children}
      <View style={styles.errorWrapper}>
        {shouldShowError && (
          <View style={styles.error}>
            <Text style={styles.text}>Field is required</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorWrapper: {
    minHeight: 24,
    justifyContent: 'flex-start',
  },
  error: {
    marginTop: 4,
    marginLeft: 8,
  },
  text: {color: '#ff0000'},
});

export default Validation;
