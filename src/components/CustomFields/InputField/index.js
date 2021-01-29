import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const InputField = (props) => {
  const { field, form, type, label, placeholder, disabled } = props;

  // field have { name, value, onChange, onBlur }
  const { name } = field;

  // form have { values, errors, touched, ... }
  // Show Warning If Errors
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input
        type={type}
        id={name}
        disabled={disabled}
        placeholder={placeholder}
        {...field}
        invalid={showError}
      />

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
};

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

export default InputField;
