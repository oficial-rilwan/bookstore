import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Topbar from "../../components/topbar/Topbar";
import BannerImage from "../../banner-img.svg";
import { Link } from "react-router-dom";
import "./home.css";
import Category from "../../components/categories/Category";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div>
      <>
        <Topbar />
        <Container fluid="xl">
          <Row className="home-row">
            <Col sm={12} md={6} lg={6} className="mb-5">
              <div className="hero-content">
                <h1 className="cta">Get Your New Book with the Best Price</h1>
                <p>Buy two selected books and get one for free</p>
                <button className="link-button">
                  <Link to="/books" className="link-button">
                    View More
                  </Link>
                </button>
              </div>
            </Col>
            <Col>
              <div className="hero-image">
                <img src={BannerImage} alt="hero" />
              </div>
            </Col>
          </Row>
        </Container>
        <Category />

        <Footer />
      </>
    </div>
  );
};

export default Home;
