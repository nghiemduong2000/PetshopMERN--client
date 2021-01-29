import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

const RadioField = (props) => {
  const { field, form, type, disabled, dataRadio } = props;

  // field have { name, value, onChange, onBlur }
  const { name } = field;

  // form have { values, errors, touched, ... }
  // Show Warning If Errors
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return dataRadio.map((item, index) => {
    return (
      <FormGroup key={index}>
        <Label>
          <Input
            type={type}
            disabled={disabled}
            {...field}
            value={item.value}
            invalid={showError}
          />{' '}
          {item.title}
        </Label>

        <ErrorMessage name={name} component={FormFeedback} />
      </FormGroup>
    );
  });
};

RadioField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default RadioField;
