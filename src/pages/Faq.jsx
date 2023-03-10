import React from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import FaqList from "../components/UI/FaqList";

const Faq = () => {
  return (
    <Helmet title="Faqs">
      <CommonSection title="Faqs" />
      <section>
        <Container>
          <Row>
            <FaqList />
            <FaqList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Faq;
