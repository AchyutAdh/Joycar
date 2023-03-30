import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Typography, Stack, Button } from '@mui/material';

// components
import Image from '../../components/Image';



// ----------------------------------------------------------------------


export default function LiveAuctionCard({ data }) {

 
 
  return (
    <>
    <Card sx={{
      cursor: 'pointer',
      transition: "transform 0.15s ease-in-out",
      ':hover': {
        transform: "scale3d(1.05, 1.05, 1)"
      }}}>
    <RouterLink to={`/buyer/liveauction/${data.id}`} color="inherit" style={{textDecoration: 'none', textTransform: 'capitalize'}}>
      <Box sx={{ position: 'relative', background: '#333d48' }}>
         
        <Image alt="" src="" ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 2, mt: 0 }}>
        
          <Typography variant="subtitle2" noWrap style={{color: 'black', fontWeight: 'bold'}}>
             {data.car.name} ({data.car.model})
          </Typography>
      </Stack>
      </RouterLink>

        
    </Card>  

    </>
  );
}