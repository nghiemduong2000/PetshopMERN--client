import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateUser } from 'actions/authActions';
import { resetSession } from 'actions/sessionActions';
import Axios from 'axios';
import InputField from 'components/CustomFields/InputField';
import HeaderBoxProducts from 'components/HeaderBoxProducts';
import Navbar from 'components/Navbar';
import { FastField, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Col,
  Collapse,
  Container,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  Row,
  Table,
} from 'reactstrap';
import * as Yup from 'yup';
import Paypal from './components/Paypal';
import { dataRadio } from './data';
import './style.scss';

const PaymentPage = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  const currentSession = useSelector((state) => state.session.session);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    data: [],
    radio: 'cod',
    modal: false,
  });

  const initialValues = {
    userName: isAuthenticated ? currentUser.userName : '',
    userEmail: isAuthenticated ? currentUser.userEmail : '',
    userPhone: isAuthenticated ? currentUser.userPhone : '',
    userAddress: isAuthenticated ? currentUser.userAddress : '',
    paymentMethod: 'cod',
  };

  useEffect(() => {
    setState((newState) => ({
      ...newState,
      data: isAuthenticated
        ? currentUser.cart
        : !currentSession
        ? []
        : currentSession.length === 0
        ? []
        : currentSession.cart,
    }));
    //eslint-disable-next-line
  }, [isAuthenticated, currentSession, currentUser]);

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Vui lòng điền họ và tên'),

    userPhone: Yup.string().required('Vui lòng điền số điện thoại'),

    userAddress: Yup.string().required('Vui lòng điền địa chỉ'),
  });

  const toggleModal = () => {
    setState((newState) => ({
      ...newState,
      modal: !newState.modal,
    }));
  };

  const handleSubmit = async (values) => {
    const {
      userName,
      userEmail,
      userAddress,
      userPhone,
      paymentMethod,
    } = values;
    const data = {
      userName: userName,
      userEmail: userEmail,
      userAddress: userAddress,
      userPhone: userPhone,
      paymentMethod: paymentMethod,
      productsList: state.data,
    };

    const newOrder = await Axios.post('/api/orders', data);
    toggleModal();

    const dataUser = new FormData();
    dataUser.append('cart', JSON.stringify([]));
    await dataUser.append(
      'orders',
      JSON.stringify([newOrder.data, ...currentUser.orders])
    );

    dispatch(isAuthenticated ? updateUser({ dataUser }) : resetSession());
  };

  const onSuccess = async (value) => {
    const { address, email } = value;
    const data = {
      userName: address.recipient_name,
      userPhone: '1234567890',
      userAddress: `${address.line1}, ${address.city}, ${address.state}, ${address.country_code}`,
      userEmail: email,
      productsList: state.data,
      paymentMethod: 'paypal',
    };

    const newOrder = await Axios.post('/api/orders', data);
    toggleModal();

    const dataUser = new FormData();
    dataUser.append('cart', JSON.stringify([]));
    console.log(currentUser.orders);
    await dataUser.append(
      'orders',
      JSON.stringify([newOrder.data, ...currentUser.orders])
    );

    dispatch(isAuthenticated ? updateUser({ dataUser }) : resetSession());
  };
  return (
    <div className='paymentPage'>
      {!props.location.state && <Redirect to='/' />}
      <Navbar location={props.location} />
      <Modal isOpen={state.modal} className='paymentPage__success' centered>
        <ModalBody>
          <FontAwesomeIcon icon={faCheckCircle} />
          <h4>Đặt hàng thành công</h4>
          <div className='paymentPage__success-redirect'>
            <Link className='btn btn--primary' to='/products'>
              Tiếp tục mua hàng
            </Link>
            {isAuthenticated && (
              <Link className='btn btn--secondary' to='/'>
                Danh sách đơn hàng
              </Link>
            )}
          </div>
        </ModalBody>
      </Modal>
      <Container>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to='/cart'>Giỏ hàng</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Thanh toán</BreadcrumbItem>
        </Breadcrumb>
        <HeaderBoxProducts
          dataHeaderBoxProducts={[{ title: 'Thanh toán', data: '' }]}
        />
        <Row className='paymentPage__main'>
          <Col md='5' className='paymentPage__main-left'>
            <div className='paymentPage__main-title'>
              <span>1</span>
              Đơn hàng của bạn
            </div>
            <Table className='paymentPage__main-table'>
              <thead>
                <tr>
                  <th style={{ width: '70%' }}>Sản phẩm</th>
                  <th style={{ width: '30%' }}>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {item.name}
                        <span>{` x ${item.quantity}`}</span>
                      </td>
                      <td>
                        {(item.price * item.quantity).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                    </tr>
                  );
                })}
                <tr className='paymentPage__main-table-total'>
                  <td>Tổng</td>
                  <td>
                    {state.data
                      .reduce((total, item) => {
                        return total + item.price * item.quantity;
                      }, 0)
                      .toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md='7' className='paymentPage__main-right'>
            <div className='paymentPage__main-title'>
              <span>2</span>
              Thông tin đặt hàng
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {(formikProps) => {
                return (
                  <Form className='paymentPage__form'>
                    <FastField
                      type='text'
                      name='userName'
                      component={InputField}
                      label='Họ và tên'
                      placeholder='Họ và tên'
                    />
                    <FastField
                      type='email'
                      name='userEmail'
                      component={InputField}
                      label='Email'
                      placeholder='Email'
                    />
                    <FastField
                      type='text'
                      name='userPhone'
                      component={InputField}
                      label='Số điện thoại'
                      placeholder='Số điện thoại'
                    />
                    <FastField
                      type='text'
                      name='userAddress'
                      component={InputField}
                      label='Địa chỉ'
                      placeholder='Địa chỉ'
                    />
                    <Label>Phuơng thức thanh toán</Label>
                    <FormGroup tag='fieldset'>
                      {dataRadio.map((item, index) => {
                        return (
                          <FormGroup key={index} check>
                            <Label check>
                              <Field name='paymentMethod'>
                                {({ field, form }) => (
                                  <input
                                    {...field}
                                    type='radio'
                                    value={item.value}
                                    checked={state.radio === item.value}
                                    onChange={(e) => {
                                      form.setFieldValue(
                                        field.name,
                                        e.target.value
                                      );

                                      setState((newState) => ({
                                        ...newState,
                                        radio: e.target.value,
                                      }));
                                    }}
                                  />
                                )}
                              </Field>
                              {item.title}
                            </Label>
                          </FormGroup>
                        );
                      })}
                    </FormGroup>
                    <Collapse isOpen={state.radio === 'transfer'}>
                      <Card>
                        <CardBody>
                          <strong>
                            LƯU Ý: CHỈ CHUYỂN KHOẢN SAU KHI NHÂN VIÊN BÁN HÀNG
                            LIÊN HỆ ĐẾN BẠN XÁC NHẬN ĐƠN HÀNG
                          </strong>
                          <br />
                          <span>
                            Ngân hàng Vietcombank
                            <br />
                            Số TK : 1234567891011
                            <br />
                            Chi nhánh: VCB PGD Đội Cấn
                            <br />
                            Chủ TK: Nghiêm Tùng Dương
                          </span>
                          {` `}
                        </CardBody>
                      </Card>
                    </Collapse>
                    <button
                      type='submit'
                      className='btn btn-primary paymentPage__form-submit'
                      style={{
                        display: state.radio === 'paypal' ? 'none' : 'block',
                      }}
                    >
                      Hoàn tất đặt hàng
                    </button>
                    <div
                      className='paymentPage__main-paypal'
                      style={{
                        display: state.radio === 'paypal' ? 'block' : 'none',
                      }}
                    >
                      <Paypal
                        total={state.data.reduce((total, item) => {
                          return total + item.price * item.quantity;
                        }, 0)}
                        onSuccess={onSuccess}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

PaymentPage.propTypes = {};

export default PaymentPage;
