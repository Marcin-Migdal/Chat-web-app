import { FormField } from 'components/FormField/FormField';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { defaultValues, validationSchema } from './formikConfig';

export const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const login = ({ email, password }, { setSubmittin }) => {
    console.log('login in: ', email, password);
  };

  const handleClick = () => {
    history.push('signup');
  };

  return (
    <div className="auth-form">
      <h1>Login</h1>
      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField label="Email" inputName="email" type="email" />
            <FormField label="Password" inputName="password" type="password" />
            <div className="auth-link-container">
              Don't have an account?
              <p onClick={handleClick} className="auth-link">
                Sign Up!
              </p>
            </div>

            <button
              disabled={!isValid || isSubmitting}
              className="button"
              type="submit"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      {!!serverError && <div className="error"> {serverError}</div>}
    </div>
  );
};
