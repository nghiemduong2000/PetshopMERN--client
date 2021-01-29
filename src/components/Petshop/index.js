import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadUser } from 'actions/authActions';
import { getProducts } from 'actions/productActions';
import { loadSession } from 'actions/sessionActions';
import Footer from 'components/Footer';
import Cart from 'Pages/CartPage';
import Home from 'Pages/Home';
import Login from 'Pages/Login';
import PaymentPage from 'Pages/PaymentPage';
import ProductDetail from 'Pages/ProductDetail';
import ProductsPage from 'Pages/ProductsPage';
import Register from 'Pages/Register';
import User from 'Pages/User';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { dataProductsPages } from './data';
import './style.scss';

const Petshop = (props) => {
  const [state, setState] = useState({
    iconScroll: false,
  });

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const listenScrollEvent = (e) => {
    if (window.scrollY > 400) {
      setState((newState) => ({
        ...newState,
        iconScroll: true,
      }));
    } else {
      setState((newState) => ({
        ...newState,
        iconScroll: false,
      }));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    dispatch(loadUser());
    dispatch(getProducts());
    dispatch(loadSession());
    //eslint-disable-next-line
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      {typeof isAuthenticated === 'object' ? (
        <div className='loadingAuthenticated'>
          <img
            src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1606378313/Petshop%20Project/base/Logo-01_pgk5so.png'
            alt=''
          />
        </div>
      ) : (
        <Fragment>
          <Switch>
            <Route exact path='/' component={Home} />
            {dataProductsPages.map((item, index) => (
              <Route
                exact
                path={item.path}
                render={(props) => (
                  <ProductsPage
                    {...props}
                    name={item.name}
                    filter={item.filter}
                    index={item.index}
                  />
                )}
                key={index}
              />
            ))}
            <Route exact path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/user' component={User} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/payment' component={PaymentPage} />
            <Route exact path='/search' component={ProductsPage} />
            <Route exact path='/:productId' component={ProductDetail} />
          </Switch>
          <Footer />
          <button
            className={`scrollToTop ${state.iconScroll ? 'show' : ''}`}
            onClick={scrollToTop}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Petshop;
