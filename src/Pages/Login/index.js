import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { login } from 'actions/authActions';
import InputField from 'components/CustomFields/InputField';
import PasswordField from 'components/CustomFields/PasswordField';
import { FastField, Form, Formik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Container } from 'reactstrap';
import * as Yup from 'yup';
import './style.scss';

const Login = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [state, setState] = useState({
    loginID: '',
    password: '',
    msg: null,
  });

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
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

  const initialValues = {
    userEmail: '',
    userPassword: '',
  };

  const validationSchema = Yup.object().shape({
    userEmail: Yup.string().required('Vui lòng nhập email'),

    userPassword: Yup.string().required('Vui lòng nhập mật khẩu'),
  });

  const handleSubmit = (values) => {
    const { userEmail, userPassword } = values;
    const user = {
      userEmail,
      userPassword,
    };

    dispatch(login(user));
  };

  return (
    <Fragment>
      {!isAuthenticated ? null : props.location.state ? (
        <Redirect to={props.location.state.pathname} />
      ) : (
        <Redirect to='/' />
      )}
      <div className='login'>
        <div className='login__header'>
          <Container className='login__header-wrap'>
            <Link to='' className='login__header-link'>
              <img
                src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1606378313/Petshop%20Project/base/Logo-01_pgk5so.png'
                alt=''
              />
            </Link>
          </Container>
        </div>
        <Container>
          <div className='login__main'>
            <div className='login__benefits-register'>
              <h1 className='login__benefits-register-title'>
                Lợi ích khi đăng ký thành viên
              </h1>
              <ul className='login__benefits-register-list'>
                <li className='login__benefits-register-item'>
                  <FontAwesomeIcon icon={faChevronRight} />
                  Cập nhật cũng như hưởng nhiều khuyến mại hấp dẫn.
                </li>
                <li className='login__benefits-register-item'>
                  <FontAwesomeIcon icon={faChevronRight} />
                  Mua hàng nhanh với chỉ 1 nhấp chuột.
                </li>
                <li className='login__benefits-register-item'>
                  <FontAwesomeIcon icon={faChevronRight} />
                  Dễ dàng kiểm tra thông tin, lịch sử mua hàng.
                </li>
                <li className='login__benefits-register-item'>
                  <FontAwesomeIcon icon={faChevronRight} />
                  Sản phầm đa dạng.
                </li>
                <li className='login__benefits-register-item'>
                  <FontAwesomeIcon icon={faChevronRight} />
                  Đổi trả dễ dàng.
                </li>
              </ul>
              <Link
                to='/register'
                className='btn btn--white login__benefits-register-link'
              >
                Đăng ký ngay
              </Link>
            </div>
            <div className='login__form'>
              <h1 className='login__form-title'>Đăng nhập tài khoản</h1>
              {state.msg ? <Alert color='danger'>{state.msg}</Alert> : null}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                {(formikProps) => {
                  return (
                    <Form className='login__form-main'>
                      <FastField
                        type='email'
                        name='userEmail'
                        component={InputField}
                        label='Email'
                        placeholder='Nhập email'
                      />
                      <FastField
                        type='password'
                        name='userPassword'
                        component={PasswordField}
                        label='Password'
                        placeholder='Nhập mật khẩu'
                      />
                      <button
                        type='submit'
                        className='btn btn--primary login__form-btn'
                      >
                        Đăng nhập
                      </button>
                    </Form>
                  );
                }}
              </Formik>
              <p className='login__form-register'>
                Bạn chưa có tài khoản? <Link to='/register'>Đăng ký ngay</Link>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default Login;
