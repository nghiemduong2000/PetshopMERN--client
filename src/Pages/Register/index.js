import { register } from 'actions/authActions';
import InputField from 'components/CustomFields/InputField';
import PasswordField from 'components/CustomFields/PasswordField';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Container } from 'reactstrap';
import * as Yup from 'yup';
import './style.scss';

const Register = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [state, setState] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userPassword: '',
  });

  const initialValues = {
    userEmail: '',
    userPassword: '',
    userName: '',
    userPhone: '',
  };

  const validationSchema = Yup.object().shape({
    userEmail: Yup.string().required('Vui lòng nhập email'),

    userPassword: Yup.string().required('Vui lòng nhập mật khẩu'),

    userName: Yup.string().required('Vui lòng nhập họ và tên'),

    userPhone: Yup.string().required('Vui lòng nhập số điện thoại'),
  });

  const handleSubmit = (values) => {
    const { userEmail, userPassword, userName, userPhone } = values;
    const dataRegister = {
      userEmail,
      userPassword,
      userName,
      userPhone,
    };

    dispatch(register(dataRegister));
  };

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
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

  return (
    <div className='register'>
      {!isAuthenticated ? null : <Redirect to='/' />}
      <div className='register__header'>
        <Container className='register__header-wrap'>
          <Link to='/' className='register__header-link'>
            <img
              src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1606378313/Petshop%20Project/base/Logo-01_pgk5so.png'
              alt=''
            />
          </Link>
        </Container>
      </div>
      <div className='register__main'>
        <div className='register__form'>
          <h1 className='register__form-title'>Đăng ký tài khoản</h1>
          {state.msg ? <Alert color='danger'>{state.msg}</Alert> : null}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formikProps) => {
              return (
                <Form className='register__form-main'>
                  <FastField
                    type='text'
                    name='userName'
                    component={InputField}
                    label='Họ và tên'
                    placeholder='Nhập họ và tên'
                  />
                  <FastField
                    type='email'
                    name='userEmail'
                    component={InputField}
                    label='Email'
                    placeholder='Nhập email'
                  />
                  <FastField
                    type='tel'
                    name='userPhone'
                    component={InputField}
                    label='Số điện thoại'
                    placeholder='Nhập số điện thoại'
                  />
                  <FastField
                    type='password'
                    name='userPassword'
                    component={PasswordField}
                    label='Mật khẩu'
                    placeholder='Nhập mật khẩu'
                  />
                  <button
                    type='submit'
                    className='btn btn--primary register__form-btn'
                  >
                    Đăng ký
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
