import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BoxProducts from 'components/BoxProducts';
import Navbar from 'components/Navbar';
import React from 'react';
import { Container } from 'reactstrap';
import Banner from './components/Banner';
import Brand from './components/Brand';
import HandBook from './components/Handbook';
import ListProducts from './components/ListProducts';
import New from './components/New';
import { dataBrand, dataNew } from './data';
import './style.scss';

const Home = (props) => {
  return (
    <div className='home'>
      <Navbar location={props.location} />
      <Container>
        <Banner />
        <ListProducts />
        <div className='bannerGroup'>
          <div className='bannerGroup__inner'>
            <span className='bannerGroup__inner-title'>
              <h2>PetCom - by</h2>
              <img
                src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1606378313/Petshop%20Project/base/Logo-01_pgk5so.png'
                alt='logo'
              />
            </span>
            <p className='bannerGroup__inner-desc'>
              PetCom được tạo ra nhằm xây dựng cộng đồng nuôi thú cưng văn minh,
              tạo không gian gặp gỡ và kết nối giữa thú cưng và chủ thú cưng
              giống bạn, nơi chia sẻ khoảnh khắc thú vị cùng thú cưng, chia sẻ
              kinh nghiệm nuôi dạy thú cưng.
            </p>
            <a
              href='https://www.facebook.com'
              //eslint-disable-next-line
              target='_blank'
              className='btn btn--white bannerGroup__inner-btn'
            >
              Tham gia
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </div>
        </div>
        <BoxProducts dataBoxProducts={dataBrand} component={Brand} />
        <HandBook />
        <BoxProducts dataBoxProducts={dataNew} component={New} />
      </Container>
    </div>
  );
};

export default Home;
