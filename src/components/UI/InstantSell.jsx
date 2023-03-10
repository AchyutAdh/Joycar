import React from "react";
import "../../styles/instant-sell.css";
import { Container, Row, Col } from "reactstrap";

import sellImg from "../../assets/all-images/toyota-offer-2.png";

const InstantSell = () => {
  return (
    <section className="become__sell">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__sell-img">
            <img src={sellImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__sell-title">
            Sell your car with confidence using AI-powered valuation
            </h2>

            <button className="btn become__sell-btn mt-4">
               Instant sell
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InstantSell;
