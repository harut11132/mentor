import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

interface StepperControlButtonsProps {
  leftButtonText?: string;
  rightButtonText?: string;
  disabledRightButton?: boolean;
  disabledLeftButton?: boolean;
  onLeftButton?: () => void;
  onRightButton: () => void;
}

const StepperControlButtons = ({
  leftButtonText,
  rightButtonText,
  disabledRightButton,
  disabledLeftButton,
  onLeftButton,
  onRightButton,
}: StepperControlButtonsProps) => {
  const showBoth = onLeftButton && onRightButton;
  return (
    <View style={styles.root}>
      {onLeftButton && (
        <View style={showBoth ? styles.halfScreen : styles.fullScreen}>
          <Button
            title={leftButtonText ?? 'Go Back'}
            disabled={disabledLeftButton}
            onPress={onLeftButton}
          />
        </View>
      )}
      <View style={showBoth ? styles.halfScreen : styles.fullScreen}>
        <Button
          title={rightButtonText ?? 'Next'}
          disabled={disabledRightButton}
          onPress={onRightButton}
        />
      </View>
    </View>
  );
};

export default StepperControlButtons;

const styles = StyleSheet.create({
  root: {justifyContent: 'space-between', flexDirection: 'row', marginTop: 20},
  fullScreen: {width: '100%'},
  halfScreen: {width: '45%'},
});
