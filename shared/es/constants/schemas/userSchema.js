import * as yup from 'yup';

const SIGNUP = yup.object({
  name: yup.string().max(255).required(),
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).required()
});

const SIGNIN = yup.object({
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).required()
});

export default { SIGNUP, SIGNIN };
