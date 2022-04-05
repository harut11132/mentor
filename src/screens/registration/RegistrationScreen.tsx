import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Wizard from 'react-native-wizard';
import EmploymentInfoForm from './EmploymentInfoForm';
import GroupCreation from './GroupCreation';
import UserPersonalInfoForm from './UserPersonalInfoForm';

const Registration = () => {
  const wizard = useRef();
  const [step, setStep] = useState(0);

  const stepList = [
    {
      content: <UserPersonalInfoForm goNext={() => wizard?.current?.next()} />,
    },
    {
      content: (
        <EmploymentInfoForm
          goNext={() => wizard?.current?.next()}
          goBack={() => wizard?.current?.prev()}
        />
      ),
    },
    {
      content: <GroupCreation goBack={() => wizard?.current?.prev()} />,
    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <Wizard
        contentContainerStyle={styles.wizard}
        ref={wizard}
        steps={stepList}
        currentStep={({currentStep}) => {
          setStep(currentStep);
        }}
      />

      <View style={styles.stepper}>
        {stepList.map((val, index) => (
          <View
            key={'step-indicator-' + index}
            style={[
              styles.steperIndicaor,
              index === step
                ? styles.stepActiveColor
                : styles.stepInactiveColor,
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  root: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wizard: {
    width: '100%',
  },
  stepper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 18,
  },
  steperIndicaor: {width: 10, marginHorizontal: 6, height: 10, borderRadius: 5},
  stepActiveColor: {backgroundColor: '#fc0'},
  stepInactiveColor: {backgroundColor: '#000'},
});
