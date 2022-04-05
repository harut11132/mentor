import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import Validation from '../../components/formControl/Validaion';
import InputWithTitle from '../../components/InputWithTitle';
import StepperControlButtons from '../../components/StepperControlButtons';
import useAppSelector from '../../hooks/useAppSelector';
import {setEmploymentInfo} from '../../redux/modules/employee';
import {EmploymentInfo} from '../../types/types';
import {employmentInfoFormSchema} from '../../validation/validation';
import WizardContentWrapper from './WizardContentWraper';

interface EmploymentInfoFormProps {
  goNext: () => void;
  goBack: () => void;
}

const EmploymentInfoForm = ({goNext, goBack}: EmploymentInfoFormProps) => {
  const dispatch = useDispatch();
  const employmentInfo = useAppSelector(state => state.employee.employmentInfo);

  const handleSubmit = (values: EmploymentInfo) => {
    dispatch(setEmploymentInfo(values));
    goNext();
  };

  return (
    <WizardContentWrapper title="Employmet Information">
      <Formik
        initialValues={employmentInfo}
        validationSchema={employmentInfoFormSchema}
        onSubmit={handleSubmit}>
        {frm => (
          <View>
            <Validation
              error={frm.errors.department}
              hideError={!frm.touched.department}>
              <InputWithTitle
                title="Department"
                value={frm.values.department}
                onChangeText={frm.handleChange('department')}
              />
            </Validation>
            <Validation
              error={frm.errors.jobTitle}
              hideError={!frm.touched.jobTitle}>
              <InputWithTitle
                title="JobTitle"
                value={frm.values.jobTitle}
                onChangeText={frm.handleChange('jobTitle')}
              />
            </Validation>

            <StepperControlButtons
              onLeftButton={goBack}
              onRightButton={frm.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </WizardContentWrapper>
  );
};

export default EmploymentInfoForm;
