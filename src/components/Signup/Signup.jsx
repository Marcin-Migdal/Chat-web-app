import { fb } from 'service';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { FormField } from 'components';
import { useHistory } from 'react-router';
import { defaultValues, validationSchema } from './formikConfig';

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res?.user?.uid) {
          fetch('/api/createUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: res.user.uid,
              userName: userName,
            }),
          }).then(() => {
            fb.firestore
              .collection('chatUsers')
              .doc(res.user.uid)
              .set({ userName, avatar: '' });
          });
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again",
          );
        }
      })
      .catch(e => {
        if (e.code === 'auth/email-already-in-use') {
          setServerError('An account with this email already exist');
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again",
          );
        }
      })
      .finally(() => setSubmitting(false));
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
              <p onClick={() => history.push('login')} className="auth-link">
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
