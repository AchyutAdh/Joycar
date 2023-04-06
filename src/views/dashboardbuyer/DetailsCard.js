import PropTypes from 'prop-types';
// @mui
import { Card, Typography, CardHeader, Stack } from '@mui/material';
import CountdownTimer from './CountdownTimer';
// component


// ----------------------------------------------------------------------

DetailsCard.propTypes = {
  profile: PropTypes.object,
};

export default function DetailsCard({ data }) {
 
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
            <span  style={{fontWeight: 'bold'}}>Highest Bid:</span> {data && data.price}
          </Typography>
        </Stack>

     
        <Stack direction="row">
          
          <Typography variant="body2"><span style={{fontWeight: 'bold'}}>Auction Ends In:</span> <span style={{fontWeight: 'bold', color: '#c92130'}}><CountdownTimer  targetDate={data && data.end_time}/></span></Typography>
        </Stack>

       
      </Stack>
    </Card>
  );
}