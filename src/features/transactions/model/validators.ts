import * as Yup from 'yup';



export const registerValidator = Yup.object().shape({
  name: Yup.string().label('name').required(),
  website: Yup.string().label('website').required(),
  description: Yup.string().label('description').required()
});
