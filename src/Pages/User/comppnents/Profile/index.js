import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateUser } from 'actions/authActions';
import FileField from 'components/CustomFields/FileField';
import InputField from 'components/CustomFields/InputField';
import HeaderBoxProducts from 'components/HeaderBoxProducts';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'reactstrap';
import * as Yup from 'yup';
import './style.scss';

const Profile = (props) => {
  const user = useSelector((state) => state.auth.user);
  const { userName, userEmail, userPhone, userAddress, imageUser } = user;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    modal: false,
  });

  const initialValues = {
    userName,
    userEmail,
    userPhone,
    userAddress,
    imageUser,
  };

  const validationSchema = Yup.object().shape({
    userEmail: Yup.string().required('Vui lòng nhập email'),

    userAddress: Yup.string().required('Vui lòng nhập địa chỉ'),

    userName: Yup.string().required('Vui lòng nhập họ và tên'),

    userPhone: Yup.string().required('Vui lòng nhập số điện thoại'),
  });

  const toggle = () => {
    setState((newState) => ({
      ...newState,
      modal: !newState.modal,
    }));
  };

  const handleSubmit = (values) => {
    const { userEmail, userAddress, userName, userPhone, imageUser } = values;
    const dataUser = new FormData();
    dataUser.append('userName', userName);
    dataUser.append('userEmail', userEmail);
    dataUser.append('userPhone', userPhone);
    dataUser.append('userAddress', userAddress);
    if (typeof imageUser !== 'string') {
      dataUser.append('imageUser', imageUser);
    }

    dispatch(updateUser({ dataUser }));
    toggle();
  };

  return (
    <div className='profile'>
      <HeaderBoxProducts
        dataHeaderBoxProducts={[{ title: 'Hồ sơ', data: '' }]}
        slider={false}
      />
      <Modal
        isOpen={state.modal}
        toggle={toggle}
        centered
        className='profile__modal'
      >
        <FontAwesomeIcon icon={faCheckCircle} />
        <h4>Cập nhật thành công</h4>
      </Modal>
      <div className='profile__main'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(formikProps) => {
            return (
              <Form className='profile__form-wrapper'>
                <div className='profile__form'>
                  <div className='profile__form-left'>
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
                      type='text'
                      name='userAddress'
                      component={InputField}
                      label='Địa chỉ'
                      placeholder='Nhập địa chỉ'
                    />
                  </div>
                  <div className='profile__form-right'>
                    <FastField
                      name='imageUser'
                      component={FileField}
                      label='Ảnh đại diện'
                      type='file'
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='btn btn--primary profile__form-btn'
                >
                  Lưu
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
