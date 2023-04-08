import { useEffect, useState } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';

// material-ui
import { Card, Typography, Table,  TableBody, TableContainer, TableRow, TableCell, TableHead, Box, Tooltip, Fab, Button  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| DEFAULT Appointments ||============================== //

const Appointments = () => {
   

    const token = localStorage.getItem('access_token')


    const [data, setData] = useState(null);
    const [appointmentList, setAppointmentList] = useState(null);


    async function fetchData() {
        const response = await fetch('http://127.0.0.1:8000/api/me/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const json = await response.json();
        setData(json);
      }


      async function fetchAppointments() {
        const response = await fetch(`http://127.0.0.1:8000/users/${data && data.id}/won_auctions/`);
        const json = await response.json();
        setAppointmentList(json);
      }

     
    
      useEffect(() => {
        fetchData();
      }, []);

      if (appointmentList === null) {
        fetchAppointments();
      }


    if (localStorage.getItem('access_token') === null) {
        return <Navigate to="/login" />;
      }

      const userType = localStorage.getItem('user');
     
      if (userType !== 'buyer') {
          return <Navigate to={`/seller/dashboard`} />;
        }


     
        console.log(appointmentList)


    return (
        <MainCard title="My Appointments">

            <TableContainer>
           
              <Table>
              <TableHead>
              
              <TableRow>

              <TableCell align="center">
                       S.N
                    </TableCell>

                    <TableCell align="center">
                       Car Name
                    </TableCell>

                    <TableCell align="center">
                       Price
                    </TableCell>

                    <TableCell align="center">
                       Seller
                    </TableCell>

                    <TableCell align="center">
                      End Date
                    </TableCell>

                    <TableCell align="center">
                      Actions
                    </TableCell>
                 

                </TableRow>

                </TableHead>

                      <TableBody>

                    {appointmentList && appointmentList !== null ? <>

                        {appointmentList && appointmentList.map((item, index) => (
                        <TableRow hover align="center" key={item.id}>

                            <TableCell align="center">

                            <Typography>
                              {index + 1}
                            </Typography>
                            </TableCell>

                            <TableCell align="center">
                              
                            <Typography>
                            {item.car.name}
                            </Typography>
                            </TableCell>

                            <TableCell align="center">
                             {item.price.split('.')[0]}
                            </TableCell>

                            <TableCell align="center">
                            <Typography>
                                <span style={{textTransform: 'capitalize'}}>{item.seller_name}</span>
                            </Typography>
                            </TableCell>

                            <TableCell align="center">
                              {item.end_time.split('T')[0]}
                            </TableCell>
    

                            <TableCell align="center">
                              <Button component={RouterLink} variant='outlined' >Book</Button>
                            </TableCell>


                        </TableRow>
                        ))}
                        </>
                        
                    : null}
              
                </TableBody>
              </Table>
               
            </TableContainer>


          
       
    </MainCard>
    );
};

export default Appointments;
