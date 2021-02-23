import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderBoxProducts from 'components/HeaderBoxProducts';
import { dataHandBook } from 'Pages/Home/data';
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import './style.scss';

const HandBook = (props) => {
  return (
    <div className='home__handbook'>
      <HeaderBoxProducts dataHeaderBoxProducts={dataHandBook} slider={false} />
      <Row className='home__handbook-content'>
        {dataHandBook[0].data.map((data, index) => {
          return (
            <Col
              key={index}
              xs='6'
              md='3'
              className='home__handbook-content-item'
            >
              <div className='home__handbook-content-item-inner'>
                <FontAwesomeIcon icon={data.icon} />
                <h3>{data.title}</h3>
                <p>{data.desc}</p>
                <Link to='' className='btn btn-primary'>
                  Khám phá
                </Link>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HandBook;
