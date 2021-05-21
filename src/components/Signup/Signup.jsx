import { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Formik } from 'formik';
import { defaultValues, validationSchema } from './formikConfig';
import { FormField } from 'components';

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const handleClick = () => {
    history.push('login');
  };

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    console.log('Signing up: ', email, userName, password);
  };

  return (
    <div className="auth-form">
      <h1>Signup</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField label="Username" inputName="userName" />
            <FormField label="Email" inputName="email" type="email" />
            <FormField label="Password" inputName="password" type="password" />
            <FormField
              label="Verify Password"
              inputName="verifyPassword"
              type="password"
            />

            <div className="auth-link-container">
              Already have an account?
              <p onClick={handleClick} className="auth-link">
                Log In!
              </p>
            </div>

            <button
              className="button"
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      {!!serverError && <div className="error"> {serverError}</div>}
    </div>
  );
};
