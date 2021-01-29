import {
  faFacebookF,
  faGoogle,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { dataFooter } from "./data";
import "./style.scss";

const Footer = (props) => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          {dataFooter.map((data, index) => {
            return (
              <Col key={index} md="6" lg="3">
                <Link to={data.url} className="footer__title">
                  <h3>{data.title}</h3>
                </Link>
                <ul className="footer__items-list">
                  {data.child.map((child, index) => {
                    return (
                      <li key={index} className="footer__items-item">
                        <Link to={child.url}>{child.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </Col>
            );
          })}
          <Col md="6" lg="3">
            <Link to="" className="footer__title">
              <h3>Kết nối với chúng tôi</h3>
            </Link>
            <ul className="footer__items-list">
              <li className="footer__items-item">
                <Link to="">Tổng đài: 1234 5678</Link>
              </li>
              <li className="footer__items-item">
                <Link to="">
                  Địa chỉ: 254 Đội Cấn, Ba Đình, Hà Nội, Việt Nam
                </Link>
              </li>
              <li className="footer__items-social">
                <a
                  className="footer__items-icon"
                  //eslint-disable-next-line
                  target="_blank"
                  href="https://www.youtube.com"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a
                  className="footer__items-icon"
                  //eslint-disable-next-line
                  target="_blank"
                  href="https://www.facebook.com"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  className="footer__items-icon"
                  //eslint-disable-next-line
                  target="_blank"
                  href="https://www.google.com"
                >
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a
                  className="footer__items-icon"
                  //eslint-disable-next-line
                  target="_blank"
                  href="https://www.instagram.com"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <p className="footer__copyright">
          Petshop.com - Hệ thống siêu thị thú cưng TOP 1 Việt Nam
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
