import * as Yup from 'yup';

export const defaultValues = {
  email: '',
  userName: '',
  password: '',
  verifyPassword: '',
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email addres').required('Required'),
  userName: Yup.string().required('Required').matches(/^S*/, 'no spaces').min(3, 'Must be at least 3 characters'),
  password: Yup.string().required('Required').min(8, 'Must be at least 8 characters long'),
  verifyPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Password must match'),
})