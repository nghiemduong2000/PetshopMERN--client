import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import './style.scss';

const PasswordField = (props) => {
  const { field, form, label, placeholder, disabled } = props;
  const [state, setState] = useState({
    type: 'password',
  });

  // field have { name, value, onChange, onBlur }
  const { name } = field;

  // form have { values, errors, touched, ... }
  // Show Warning If Errors
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleTypePw = () => {
    setState((newState) => ({
      ...newState,
      type: newState.type === 'password' ? 'text' : 'password',
    }));
  };

  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <div className={`passwordField-wrapper ${showError ? 'is-invalid' : ''}`}>
        <Input
          type={state.type}
          id={name}
          disabled={disabled}
          placeholder={placeholder}
          {...field}
          invalid={showError}
        />
        <FontAwesomeIcon
          icon={state.type === 'password' ? faEyeSlash : faEye}
          onClick={handleTypePw}
        />
      </div>

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
};

PasswordField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

PasswordField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
};

export default PasswordField;
