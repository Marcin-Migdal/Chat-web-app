import { ErrorMessage, Field } from 'formik';
import styles from './FormField.module.css';

export const FormField = ({ label, inputName, type = 'text' }) => {
  return (
    <label className={styles.fieldLabel}>
      {label}
      <Field className={styles.fieldInput} type={type} name={inputName} />
      <ErrorMessage className="error" component="div" name={inputName} />
    </label>
  );
};
