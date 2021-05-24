import { ErrorMessage, Field } from 'formik';
import './FormField.css';

export const FormField = ({ label, inputName, type = 'text' }) => {
  return (
    <label className="field-label">
      {label}
      <Field className="field-input" type={type} name={inputName} />
      <ErrorMessage className="error" component="div" name={inputName} />
    </label>
  );
};
