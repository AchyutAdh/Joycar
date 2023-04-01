import React from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Faq = () => {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <Helmet title="Faqs">
      <CommonSection title="Faqs" />
      <section>
        <Container>
          <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"  expandIcon={<ExpandMoreIcon />}>
              <Typography>How does Joy Car determine the market value of my car?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Joy Car uses advanced AI technology to accurately determine the market value of your car. Our AI takes into account various factors such as the make and model of your car, its age, mileage, condition, and other relevant data to provide you with an accurate valuation.
              </Typography>
            </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"  expandIcon={<ExpandMoreIcon />}>
              <Typography>Is the car valuation provided by Joy Car free of cost?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Yes, the car valuation provided by Joy Car is completely free of cost. You can get an instant valuation of your car without any hidden charges or fees.
              </Typography>
            </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"  expandIcon={<ExpandMoreIcon />}>
              <Typography>Can I sell my car through Joy Car?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Yes, you can sell your car through Joy Car. Once you receive the valuation of your car, you can choose to sell it to us at the offered price. We offer a hassle-free and transparent car selling process, where we take care of all the paperwork and provide you with a fair price for your car.
              </Typography>
            </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"  expandIcon={<ExpandMoreIcon />}>
              <Typography>How accurate is the car valuation provided by Joy Car?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              The car valuation provided by Joy Car is highly accurate, as we use advanced AI technology to determine the market value of your car. Our AI is constantly learning and adapting to ensure that you get the best possible price for your car. However, the final price may vary depending on the condition of your car and other factors.
              </Typography>
            </AccordionDetails>
            </Accordion>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default Faq;
