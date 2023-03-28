import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
   


    if (localStorage.getItem('access_token') === null) {
        return <Navigate to="/login" />;
      }

      const userType = localStorage.getItem('user');

      if (userType !== 'buyer') {
          return <Navigate to={`/seller/dashboard`} />;
        }


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
               
            </Grid>
        </Grid>
    );
};

export default Dashboard;
