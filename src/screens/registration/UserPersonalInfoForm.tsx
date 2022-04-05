import React, {useRef} from 'react';
import {Formik, FormikProps} from 'formik';
import InputWithTitle from '../../components/InputWithTitle';
import {userPersonalInfoFormSchema} from '../../validation/validation';
import Validation from '../../components/formControl/Validaion';
import StepperControlButtons from '../../components/StepperControlButtons';
import WizardContentWrapper from './WizardContentWraper';
import ProfileImageUploader from '../../components/ProfileImageUploader';
import LocationSetter, {Location} from '../../components/LocationSetter';
import {useDispatch} from 'react-redux';
import {setPersonalInfo} from '../../redux/modules/employee';
import {PersonalInfo} from '../../types/types';
import useAppSelector from '../../hooks/useAppSelector';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

interface UserPersonalInfoFormProps {
  goNext: () => void;
}

const UserPersonalInfoForm = ({goNext}: UserPersonalInfoFormProps) => {
  const dispatch = useDispatch();
  const personalInfo = useAppSelector(state => state.employee.personalInfo);
  const formikRef = useRef<FormikProps<PersonalInfo>>(null);

  const setProfileImage = (uri: string) => {
    formikRef.current?.setValues({...formikRef.current.values, image: uri});
  };

  const setLocation = (location: Location) => {
    formikRef.current?.setValues({
      ...formikRef.current.values,
      location: `lat: ${location.latitude}, long: ${location.longitude}`,
    });
  };

  const handleSubmit = (value: PersonalInfo) => {
    dispatch(setPersonalInfo(value));
    goNext();
  };

  return (
    <WizardContentWrapper title="Personal Informtion">
      <Formik
        initialValues={personalInfo}
        innerRef={formikRef}
        onSubmit={handleSubmit}
        validationSchema={userPersonalInfoFormSchema}>
        {frm => (
          <View>
            <Validation error={frm.errors.image} hideError={!!frm.values.image}>
              <ProfileImageUploader
                image={frm.values.image}
                setImage={setProfileImage}
              />
            </Validation>
            <Validation
              error={frm.errors.fullName}
              hideError={!!frm.values.fullName}>
              <InputWithTitle
                title="Full Name"
                value={frm.values.fullName}
                onChangeText={frm.handleChange('fullName')}
              />
            </Validation>
            <View style={styles.locationContainer}>
              <LocationSetter
                location={frm.values.location}
                setLocation={setLocation}
              />
            </View>
            <StepperControlButtons onRightButton={frm.handleSubmit} />
          </View>
        )}
      </Formik>
    </WizardContentWrapper>
  );
};

export default UserPersonalInfoForm;

const styles = StyleSheet.create({locationContainer: {marginTop: 10}});
