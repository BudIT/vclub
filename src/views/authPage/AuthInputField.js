import React, { PropTypes } from 'react';
import styles from './AuthPage.css';

function AuthInputField(props) {
  const {
    input, type, placeholder, className, meta,
  } = props;

  const {
    touched, error,
  } = meta;

  return (
    <div>
      <div>
        <input
          {...input}
          type={type}
          placeholder={placeholder}
          className={className}
          autoFocus
        />
        {(touched && error)
        && <span className={styles.errors}>{error}</span>}
      </div>
    </div>
  );
}

AuthInputField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }),
};

export default AuthInputField;
