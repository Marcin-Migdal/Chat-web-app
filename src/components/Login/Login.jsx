import { FormField } from 'components/FormField/FormField';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { fb } from 'service';
import { defaultValues, validationSchema } from './formikConfig';

export const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const redirect = () => {
    history.push('signup');
  };

  const login = ({ email, password }, { setSubmittin }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (!res.user) {
          setServerError(
            "We're having trouble logging you in. Please try again.",
          );
        }
      })
      .catch(e => {
        if (e.code === 'auth/wrong-password') {
          setServerError('Invalid credentials');
        } else if (e.code === 'auth/user-not-found') {
          setServerError('No account for this email');
        } else {
          setServerError('Something went wrong');
        }
      })
      .finally(() => setSubmittin(false));
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
              <p onClick={redirect} className="auth-link">
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
