import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import Navbar from 'components/Navbar';
import PaginationBar from 'components/PaginationBar';
import Product from 'components/Product';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Collapse,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import { dataFilter } from './data';
import './style.scss';

const ProductsPage = (props) => {
  const options = [
    { value: 'default', label: 'Mặc định', type: 'default' },
    { value: 'priceLH', label: 'Giá từ thấp đến cao', type: 'price' },
    { value: 'priceHL', label: 'Giá từ cao đến thấp', type: 'price' },
    { value: 'nameAZ', label: 'a-z', type: 'name' },
    { value: 'nameZA', label: 'z-a', type: 'name' },
  ];
  const loading = useSelector((state) => state.product.loading);
  const productsBase = useSelector((state) => state.product.products);
  const [state, setState] = useState({
    products: [],
    productsAlt: [],
    isOpen: false,
    filter: {
      species: [...dataFilter],
    },
    currentPage: 1,
    productsPerPage: 8,
    sort: { value: 'default', label: 'Mặc định', type: 'default' },
    isReverse: false,
  });

  useEffect(() => {
    const fetchProductsList = async () => {
      const dataProducts = await Axios.get(
        `/api/products${
          props.location.pathname === '/products'
            ? ''
            : props.location.pathname === '/search'
            ? props.location.search
            : `?${queryString.stringify(props.filter)}`
        }`
      );
      setState((newState) => ({
        ...newState,
        currentPage: 1,
        products:
          props.location.pathname !== '/products'
            ? dataProducts.data
            : productsBase,
        productsAlt:
          props.location.pathname !== '/products'
            ? dataProducts.data
            : productsBase,
      }));
    };

    fetchProductsList();
    //eslint-disable-next-line
  }, [productsBase, props.location.pathname, props.location.search]);

  // Filter
  const toggleCollapse = () => {
    setState((newState) => ({
      ...newState,
      isOpen: !newState.isOpen,
    }));
  };

  const handleToggleCheck = (value) => {
    const currentIndex = state.filter.species.indexOf(value);
    const newSpecies = [...state.filter.species];

    if (currentIndex === -1) {
      newSpecies.push(value);
    } else {
      newSpecies.splice(currentIndex, 1);
    }

    setState((newState) => ({
      ...newState,
      productsAlt: newState.products.filter((product) => {
        if (newSpecies.length === 1) {
          for (var key of newSpecies) {
            if (product.species === undefined || product.species !== key)
              return false;
          }
          return true;
        } else {
          if (product.species === 'Meo' || product.species === 'Cún') {
            return true;
          }
          return false;
        }
      }),
      filter: {
        ...newState.filter,
        species: newSpecies,
      },
    }));
  };

  // Get current products
  const indexOfLastProduct = state.currentPage * state.productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - state.productsPerPage;

  // Change page
  const paginate = (pageNumber) => {
    window.scrollTo(0, 0);

    setState((newState) => ({
      ...newState,
      currentPage: pageNumber,
    }));
  };

  const logicSort = (a, b) => {
    switch (state.sort.type) {
      case 'name':
        if (state.isReverse) {
          return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
        } else {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        }
      case 'price':
        return !state.isReverse ? a.price - b.price : b.price - a.price;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  };

  // Handle Change Sort
  const handleChangeSort = (sort) => {
    setState((newState) => ({
      ...newState,
      sort: sort,
      isReverse:
        sort.value === 'priceHL' || sort.value === 'nameZA' ? true : false,
    }));
  };

  return (
    <div className='productsPage'>
      <Navbar location={props.location} />
      <Container>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Trang chủ</Link>
          </BreadcrumbItem>
          {props.index !== 1 ? (
            <BreadcrumbItem>
              <Link to='/products'>Sản phẩm</Link>
            </BreadcrumbItem>
          ) : null}
          {props.index === 3 ? (
            <BreadcrumbItem>
              <Link
                to={
                  props.filter.species === 'Cún'
                    ? '/products/cun'
                    : '/products/meo'
                }
              >
                {props.filter.species}
              </Link>
            </BreadcrumbItem>
          ) : null}
          <BreadcrumbItem active>
            {props.location.pathname === '/search'
              ? `Kết quả tìm kiếm "${
                  queryString.parse(props.location.search).s
                }"`
              : props.name}
          </BreadcrumbItem>
        </Breadcrumb>
        {props.location.pathname === '/search' && (
          <h4 className='productsPage__titleResult'>
            {`Kết quả tìm kiếm: "${
              queryString.parse(props.location.search).s
            }"`}
          </h4>
        )}
        <div className='productsPage__filter'>
          {props.index === 1 || props.location.pathname === '/search' ? (
            <Button
              onClick={toggleCollapse}
              className='productsPage__filter-toggle'
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{
                  transform: state.isOpen ? 'rotate(90deg)' : 'rotate(0)',
                  marginRight: state.isOpen ? '1rem' : '.6rem',
                }}
              />
              Thú cưng
            </Button>
          ) : null}
          <Collapse isOpen={state.isOpen}>
            <Form className='productsPage__filter-form'>
              {dataFilter.map((data, index) => {
                return (
                  <FormGroup key={index}>
                    <Label for={data}>{data}</Label>
                    <Input
                      id={data}
                      type='checkbox'
                      onChange={() => handleToggleCheck(data)}
                      checked={
                        state.filter.species.indexOf(data) === -1 ? false : true
                      }
                      disabled={
                        !(state.filter.species.length === 1)
                          ? false
                          : state.filter.species[0] === data
                          ? true
                          : false
                      }
                    />
                  </FormGroup>
                );
              })}
            </Form>
          </Collapse>
        </div>
        <div className='productsPage__sort'>
          <Form>
            <FormGroup>
              <Select
                className='productsPage__sort-select'
                onChange={handleChangeSort}
                value={state.sort}
                options={options}
              />
            </FormGroup>
          </Form>
        </div>
        {loading ? (
          <div className='spinner__wrap'>
            <Spinner className='spinner' />
          </div>
        ) : (
          <Row>
            {state.productsAlt.length === 0 ? (
              <span className='productsPage__empty'>Không có sản phầm</span>
            ) : (
              state.productsAlt
                .sort(logicSort)
                .slice(indexOfFirstProduct, indexOfLastProduct)
                .map((product, index) => {
                  return (
                    <Col key={index} md='3' className='productsPage__item'>
                      <Product product={product} />
                    </Col>
                  );
                })
            )}
          </Row>
        )}
        <PaginationBar
          productsPerPage={state.productsPerPage}
          totalProducts={state.productsAlt.length}
          paginate={paginate}
          currentPage={state.currentPage}
        />
      </Container>
    </div>
  );
};

ProductsPage.propTypes = {
  name: PropTypes.string,
  filter: PropTypes.object,
  index: PropTypes.number,
};

ProductsPage.defaultProps = {
  name: '',
  filter: {},
  index: 0,
};

export default ProductsPage;
