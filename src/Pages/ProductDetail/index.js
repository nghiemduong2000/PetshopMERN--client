import { addToCartUser } from 'actions/authActions';
import { updateProduct } from 'actions/productActions';
import { addToCartSession } from 'actions/sessionActions';
import BoxProducts from 'components/BoxProducts';
import HeaderBoxProducts from 'components/HeaderBoxProducts';
import Navbar from 'components/Navbar';
import Product from 'components/Product';
import ProductReview from 'components/ProductReview';
import RatingStar from 'components/RatingStar';
import { productDefault } from 'global';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { dataProductDetail, dataReviews } from './data';
import './style.scss';

const ProductDetail = (props) => {
  const dispatch = useDispatch();

  // Get data REDUX from store
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userBase = useSelector((state) => state.auth.user);

  // Get productId from param
  const { productId } = useParams();

  // Get data current product
  const currentProduct = products.find((product) => product._id === productId);

  // Set state
  const [state, setState] = useState({
    quantity: 1,
    filterSixProducts: [productDefault],
    tabInfo: 1,
    dataReviews: dataReviews.reviews,
    rating: 0,
    comment: '',
  });

  // DidMount and Update
  useEffect(() => {
    setState((newState) => ({
      ...newState,
      filterSixProducts: loading
        ? [productDefault]
        : products.filter((product, index) => index < 6),
    }));
    //eslint-disable-next-line
  }, [loading]);

  // Handle change tab info
  const handleChangeTab = (data) => {
    setState((newState) => ({
      ...newState,
      tabInfo: data.data,
    }));
  };

  // Handle change rating star
  const handleChangeVote = (value) => {
    setState((newState) => ({
      ...newState,
      rating: value,
    }));
  };

  // Submit comment review
  const onSubmitComment = (e) => {
    e.preventDefault();

    const dataProduct = new FormData();

    const newReviews = [...currentProduct.reviews];
    const { _id, imageUser, userName, userEmail } = userBase;

    newReviews.unshift({
      user: { _id, imageUser, userName, userEmail },
      rating: state.rating,
      comment: state.comment,
    });
    dataProduct.append('reviews', JSON.stringify(newReviews));

    dispatch(updateProduct({ dataProduct, productId }));
    setState((newState) => ({
      ...newState,
      rating: 0,
      comment: '',
    }));
  };

  // Calculate percent rating
  const calPercent = (star) => {
    return !currentProduct
      ? 0
      : currentProduct.reviews.length === 0
      ? 0
      : (
          (currentProduct.reviews.filter((reviews) => reviews.rating === star)
            .length /
            currentProduct.reviews.length) *
          100
        ).toFixed(1);
  };

  return (
    <div className='productDetail'>
      <Navbar location={props.location} />
      <Container>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to='/products'>Sản phẩm</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {currentProduct && currentProduct.name}
          </BreadcrumbItem>
        </Breadcrumb>
        <div>
          <Row className='productDetail__main'>
            <Col md='6' className='productDetail__main-left'>
              <img
                src={currentProduct && currentProduct.imageProduct}
                alt='Product'
                className='productDetail__main-img'
              />
            </Col>
            <Col md='6' className='productDetail__main-right'>
              <h1 className='productDetail__main-title'>
                {currentProduct && currentProduct.name}
              </h1>
              <RatingStar
                className='productDetail__main-rating'
                ratingPercent={
                  !currentProduct
                    ? 0
                    : currentProduct.reviews.length === 0
                    ? 0
                    : (currentProduct.reviews.reduce(
                        (average, review) => average + review.rating,
                        0
                      ) /
                        currentProduct.reviews.length /
                        5) *
                      100
                }
              />
              <p className='productDetail__main-info'>
                Thương hiệu:{' '}
                <Link to=''>{currentProduct && currentProduct.brand}</Link>
              </p>
              <p className='productDetail__main-info'>Thông tin:</p>
              <p className='productDetail__main-price'>
                Giá bán:{' '}
                <span>
                  {currentProduct &&
                    currentProduct.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                </span>
              </p>
              <Form className='productDetail__main-form'>
                <FormGroup className='productDetail__main-quantity'>
                  <Label for='quantity'>Số lượng:</Label>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setState((newState) => ({
                        ...newState,
                        quantity: newState.quantity - 1,
                      }));
                    }}
                    disabled={state.quantity === 1 ? true : false}
                    className='productDetail__main-control'
                  >
                    -
                  </button>
                  <Input
                    id='quantity'
                    name='quantity'
                    value={state.quantity}
                    className='productDetail__main-input'
                    readOnly
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setState((newState) => ({
                        ...newState,
                        quantity: newState.quantity + 1,
                      }));
                    }}
                    disabled={state.quantity === 10 ? true : false}
                    className='productDetail__main-control'
                  >
                    +
                  </button>
                </FormGroup>
                <p className='productDetail__main-freeShip'>
                  Freeship nội thành với đơn hàng trên 200.000đ{' '}
                  <Link to=''>(Chính sách vận chuyển)</Link>
                </p>
                <FormGroup className='productDetail__main-buy-wrap'>
                  <Link
                    to={{
                      pathname: '/payment',
                      state: {
                        activePayment: true,
                      },
                    }}
                    name='buyNow'
                    className='btn btn--primary productDetail__main-buy'
                    type='button'
                    onClick={(e) => {
                      dispatch(
                        isAuthenticated
                          ? addToCartUser({
                              productId,
                              quantity: state.quantity,
                            })
                          : addToCartSession({
                              productId,
                              quantity: state.quantity,
                            })
                      );
                    }}
                  >
                    Mua ngay
                  </Link>
                </FormGroup>
                <FormGroup className='productDetail__main-buy-wrap'>
                  <button
                    name='addToCart'
                    className='btn btn--secondary productDetail__main-buy'
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        isAuthenticated
                          ? addToCartUser({
                              productId,
                              quantity: state.quantity,
                            })
                          : addToCartSession({
                              productId,
                              quantity: state.quantity,
                            })
                      );
                    }}
                  >
                    Thêm giỏ hàng
                  </button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <div className='productDetail__info'>
            <HeaderBoxProducts
              dataHeaderBoxProducts={dataProductDetail}
              slider={false}
              handleChangeTab={handleChangeTab}
            />
            <Row
              style={{ display: state.tabInfo === 1 ? 'flex' : 'none' }}
              className='productDetail__info-info'
            >
              <Col
                md='8'
                className='productDetail__info-info-left'
                dangerouslySetInnerHTML={{
                  __html: currentProduct && currentProduct.description,
                }}
              />
              <Col md='4' className='productDetail__info-info-right'>
                <Table>
                  <tbody>
                    <tr>
                      <th>Trọng lượng</th>
                      <td>1 kg</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
          <div className='productDetail__review'>
            <HeaderBoxProducts
              slider={false}
              dataHeaderBoxProducts={[{ title: 'Đánh giá về sản phẩm' }]}
            />
            <Row>
              <Col md='5' className='productDetail__review-overall'>
                <h4>Đánh giá tổng quan</h4>
                <span>
                  {!currentProduct
                    ? 0
                    : currentProduct.reviews.length === 0
                    ? 0
                    : (
                        currentProduct.reviews.reduce(
                          (average, review) => average + review.rating,
                          0
                        ) / currentProduct.reviews.length
                      ).toFixed(1)}
                </span>
                <div className='productDetail__review-ratingWrap'>
                  <RatingStar
                    className='productDetail__review-star'
                    ratingPercent={
                      !currentProduct
                        ? 0
                        : currentProduct.reviews.length === 0
                        ? 0
                        : (currentProduct.reviews.reduce(
                            (average, review) => average + review.rating,
                            0
                          ) /
                            currentProduct.reviews.length /
                            5) *
                          100
                    }
                  />
                </div>
                <div className='productDetail__review-progressWrap'>
                  <div className='productDetail__review-progress'>
                    <RatingStar
                      className='productDetail__review-star'
                      ratingPercent={100}
                    />
                    <Progress
                      value={calPercent(5)}
                      className='productDetail__review-bar'
                    />
                    <div className='productDetail__review-percent'>{`${calPercent(
                      5
                    )}%`}</div>
                  </div>
                  <div className='productDetail__review-progress'>
                    <RatingStar
                      className='productDetail__review-star'
                      ratingPercent={80}
                    />
                    <Progress
                      className='productDetail__review-bar'
                      value={calPercent(4)}
                    />
                    <div className='productDetail__review-percent'>{`${calPercent(
                      4
                    )}%`}</div>
                  </div>
                  <div className='productDetail__review-progress'>
                    <RatingStar
                      className='productDetail__review-star'
                      ratingPercent={60}
                    />
                    <Progress
                      className='productDetail__review-bar'
                      value={calPercent(3)}
                    />
                    <div className='productDetail__review-percent'>{`${calPercent(
                      3
                    )}%`}</div>
                  </div>
                  <div className='productDetail__review-progress'>
                    <RatingStar
                      className='productDetail__review-star'
                      ratingPercent={40}
                    />
                    <Progress
                      className='productDetail__review-bar'
                      value={calPercent(2)}
                    />
                    <div className='productDetail__review-percent'>{`${calPercent(
                      2
                    )}%`}</div>
                  </div>
                  <div className='productDetail__review-progress'>
                    <RatingStar
                      className='productDetail__review-star'
                      ratingPercent={20}
                    />
                    <Progress
                      className='productDetail__review-bar'
                      value={calPercent(1)}
                    />
                    <div className='productDetail__review-percent'>{`${calPercent(
                      1
                    )}%`}</div>
                  </div>
                </div>
              </Col>
              <Col md='7' className='productDetail__review-write'>
                <div className='productDetail__review-write-form'>
                  <h4>Đánh giá sản phầm</h4>
                  {isAuthenticated ? (
                    <Form onSubmit={onSubmitComment}>
                      <div className='productDetail__review-write-ratingWrap'>
                        <span>Đánh giá:</span>
                        <RatingStar
                          className='productDetail__review-write-rating'
                          handleChangeVote={handleChangeVote}
                          ratingPercent={state.rating * 20}
                        />
                      </div>
                      <FormGroup>
                        <Input
                          type='textarea'
                          placeholder='Mời bạn viết đánh giá ...'
                          className='productDetail__review-write-comment'
                          value={state.comment}
                          onChange={(e) =>
                            setState((newState) => ({
                              ...newState,
                              comment: e.target.value,
                            }))
                          }
                        />
                      </FormGroup>
                      <FormGroup className='productDetail__review-write-form-submit'>
                        <Button type='submit' className='btn btn--primary'>
                          Gửi
                        </Button>
                      </FormGroup>
                    </Form>
                  ) : (
                    <div className='productDetail__review-write-requireLogin'>
                      <span>Vui lòng đăng nhập để đánh giá</span>
                      <Link
                        to={{
                          pathname: '/login',
                          state: { ...props.location },
                        }}
                        className='btn btn--primary'
                      >
                        Đăng nhập
                      </Link>
                    </div>
                  )}
                </div>
                <div className='productDetail__review-comments'>
                  {currentProduct && currentProduct.reviews.length > 0 ? (
                    currentProduct.reviews.map((review, index) => (
                      <ProductReview review={review} key={index} />
                    ))
                  ) : (
                    <span className='productDetail__review-noComments'>
                      Chưa có đánh giá
                    </span>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <BoxProducts
            dataBoxProducts={[
              {
                title: 'sản phẩm tương tự',
                data: state.filterSixProducts,
              },
            ]}
            component={Product}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
