import { changePassword } from 'actions/authActions';
import PasswordField from 'components/CustomFields/PasswordField';
import HeaderBoxProducts from 'components/HeaderBoxProducts';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import * as Yup from 'yup';
import './style.scss';

const ChangePassword = (props) => {
  const error = useSelector((state) => state.error);
  const [state, setState] = useState({
    msg: null,
  });
  const dispatch = useDispatch();
  const initialValues = {
    newPassword: '',
    oldPassword: '',
  };

  useEffect(() => {
    if (error.id === 'CHANGEPW_FAIL') {
      setState((newState) => ({
        ...newState,
        msg: error.msg.msg,
      }));
    } else {
      setState((newState) => ({
        ...newState,
        msg: null,
      }));
    }
  }, [error]);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Nhập mật khẩu hiện tại'),
    newPassword: Yup.string().required('Nhập mật khẩu mới'),
  });

  const handleSubmit = (values) => {
    const { oldPassword, newPassword } = values;

    dispatch(changePassword(oldPassword, newPassword));
  };
  return (
    <div className='changePassword'>
      <HeaderBoxProducts
        dataHeaderBoxProducts={[{ title: 'Đổi mật khẩu', data: '' }]}
        slider={false}
      />
      {state.msg ? <Alert color='danger'>{state.msg}</Alert> : null}
      <div className='changePassword__main'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(formikProps) => {
            return (
              <Form className='changePassword__form'>
                <FastField
                  type='password'
                  name='oldPassword'
                  component={PasswordField}
                  label='Mật khẩu hiện tại'
                  placeholder='Nhập mật khẩu hiện tại'
                />
                <FastField
                  type='password'
                  name='newPassword'
                  component={PasswordField}
                  label='Mật khẩu mới'
                  placeholder='Nhập mật khẩu mới'
                />
                <button
                  type='submit'
                  className='btn btn--primary changePassword__form-btn'
                >
                  Đổi mật khẩu
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {};

export default ChangePassword;
