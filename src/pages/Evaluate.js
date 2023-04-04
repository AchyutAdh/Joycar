import {Link as RouterLink} from 'react-router-dom';
import "../styles/instant-sell.css";
import sellImg from "../assets/all-images/toyota-offer-2.png";     
import chevImg from "../assets/all-images/chev.png"; 

import EvaluateForm from './EvaluateForm';
import CommonSection from 'components/UI/CommonSection';
import { Container, Row, Col } from "reactstrap";

// ==============================|| DEFAULT Evaluate ||============================== //

const Evaluate = () => {

    return (
        <>
        <CommonSection title="Evaluate your car price with AI" />
        <Container>
        <Row>
            <Col lg="6" md="6" sm="12">
            <EvaluateForm />
            </Col>
          <Col lg="6" md="6" sm="12" className="become__sell-img">
          <img src={chevImg} alt="" className="w-100" style={{marginTop: '10px'}} />
          </Col>
         
        </Row>
        </Container>
   

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

            <RouterLink to="/login/seller" style={{textDecoration: 'none'}}>
                <button className="btn become__sell-btn mt-4" >
                Instant sell
                </button>
            </RouterLink>
          </Col>
        </Row>
      </Container>
    </section>
    </>
    );
};

export default Evaluate;
