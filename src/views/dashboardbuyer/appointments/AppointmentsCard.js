import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
// @mui
import { Card, Typography, CardHeader, Stack } from '@mui/material';
// component


// ----------------------------------------------------------------------

AppointmentsCard.propTypes = {
  profile: PropTypes.object,
};

export default function AppointmentsCard({ data }) {

 
  return (
    <Card sx={{ py: 1, px: 1, boxShadow: 3 }}>
      <CardHeader sx={{ textTransform: 'capitalize' }} title={ <Typography variant="h3" fontWeight="bold">{data && data.car && data.car.name}</Typography>} />

      <Stack spacing={2} sx={{ p: 3 }}>
      <Stack direction="row">
        <Typography variant="body2"> <span  style={{fontWeight: 'bold'}}>Description: </span>{data && data.car && data.car.description}</Typography>
        </Stack>
        
        <Stack direction="row">
        
        <Typography variant="body2">
          <span  style={{fontWeight: 'bold'}}>Model:</span> {data && data.car && data.car.model}
        </Typography>
      </Stack>


      <Stack direction="row">
        
        <Typography variant="body2">
          <span  style={{fontWeight: 'bold'}}>Year:</span> {data && data.car && data.car.year}
        </Typography>
      </Stack>

        <Stack direction="row">
        
          <Typography variant="body2">
            <span  style={{fontWeight: 'bold'}}>Seller:</span> <span style={{ textTransform: 'capitalize' }}>{data && data.car && data.seller_name}</span>
          </Typography>
        </Stack>

        <Stack direction="row">
        
          <Typography variant="body2">
            <span  style={{fontWeight: 'bold'}} >Price:</span> {data && data.car && data.price}
          </Typography>
        </Stack>

       
      </Stack>
    </Card>
  );
}