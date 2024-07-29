import * as Yup from 'yup';

export const loginValidator = Yup.object().shape({
  email: Yup.string().label('E-mail').email().required(),
  password: Yup.string().label('Password').required()
});


export const registerValidator = Yup.object().shape({
  name: Yup.string().label('FirstName').required(),
  // last_name: Yup.string().label('LastName').required(),
  email: Yup.string().label('E-mail').email().required(),
  // phone_number: Yup.string().label('PhoneNumber').required(),
  password: Yup.string().label('Password').required()
  
});
