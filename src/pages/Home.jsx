import React from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import InstantSell from "../components/UI/InstantSell";
import Testimonial from "../components/UI/Testimonial";


const Home = () => {
  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 ">
        <HeroSlider />
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Joycar</h6>
              <h2 className="section__title">Our Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
   
      {/* ===========  Instant sell section ============ */}
      <InstantSell />

      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Joycar</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

    
    </Helmet>
  );
};

export default Home;
