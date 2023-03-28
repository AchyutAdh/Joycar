import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// material-ui
import { Card, Typography, Table, Divider, TableBody, TableContainer, TableRow, TableCell, TableHead, Box, Tooltip, Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import ListCarForm from './components/ListCarForm';

// ==============================|| DEFAULT ListForm ||============================== //

const ListForm = () => {


    if (localStorage.getItem('access_token') === null) {
        return <Navigate to="/login" />;
      }

      const userType = localStorage.getItem('user');
     
      if (userType !== 'seller') {
          return <Navigate to={`/buyer/dashboard`} />;
        }



    return (
    <MainCard title="List New Car">
        
        <ListCarForm/>
       
    </MainCard>
    );
};

export default ListForm;
