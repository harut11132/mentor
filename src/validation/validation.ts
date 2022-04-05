import * as Yup from 'yup';

const REQUIRED = 'validation:required';

export const userPersonalInfoFormSchema = Yup.object().shape({
  fullName: Yup.string().trim().required(REQUIRED),
  image: Yup.string().trim().required(REQUIRED),
});

export const employmentInfoFormSchema = Yup.object().shape({
  department: Yup.string().trim().required(REQUIRED),
  jobTitle: Yup.string().trim().required(REQUIRED),
});
