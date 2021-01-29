import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import './style.scss';

const FileField = (props) => {
  const { field, form, type, label } = props;

  // field have { name, value, onChange, onBlur }
  const { name, onBlur, value } = field;

  // form have { values, errors, touched, ... }
  // Show Warning If Errors
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  // Set State For Preview Source
  const [previewSource, setPreviewSource] = useState('');

  // UI Image Preview
  const imagePreview = (param) => {
    return (
      <div className='addEdit_imagePreview'>
        <img src={param} alt='' />
      </div>
    );
  };

  // Custom On Change For File And Preview
  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    form.setFieldValue(name, file);
    previewFile(file);
  };

  // Read File And Set State
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      {/*
        If User Choose File => previewSource
        If User Update File (had file) => value
        if User Not Select Any Image => null
      */}
      {previewSource
        ? imagePreview(previewSource)
        : value
        ? imagePreview(value)
        : null}
      <div className='fileField__input'>
        <Input
          type={type}
          id={name}
          name={name}
          onBlur={onBlur}
          onChange={handleChange}
          invalid={showError}
        />
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('imageUser').click();
          }}
          className='btn btn--secondary'
        >
          Chọn ảnh
        </button>
      </div>

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
};

FileField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
};

FileField.defaultProps = {
  type: 'text',
  label: '',
};

export default FileField;
