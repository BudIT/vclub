import React, { PropTypes } from 'react';
import styles from './AuthPage.css';

function AuthInputField(props) {
  const {
    input, type, placeholder, className, meta,
  } = props;

  const {
    dirty, error,
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
        {(dirty && error)
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
    dirty: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }),
};

export default AuthInputField;
