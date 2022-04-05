import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface WizardContentWrapper {
  title: string;
  children: React.ReactNode;
}

const WizardContentWrapper = ({title, children}: WizardContentWrapper) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default WizardContentWrapper;

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {fontSize: 20, marginBottom: 20, alignSelf: 'center'},
});
