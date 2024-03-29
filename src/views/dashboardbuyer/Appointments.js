import { useEffect, useState } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';

// material-ui
import { Card, Typography, Table,  TableBody, TableContainer, TableRow, TableCell, TableHead,  Button  } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

// ==============================|| DEFAULT Appointments ||============================== //

const Appointments = () => {
   

    const token = localStorage.getItem('access_token')


    const [data, setData] = useState(null);
    const [appointmentList, setAppointmentList] = useState(null);
    const [activeAppointments, setActiveAppointments] = useState(null);


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


      async function fetchActiveAppointments() {
        const response = await fetch(`http://127.0.0.1:8000/appointments/`);
        const json = await response.json();
        setActiveAppointments(json);
      }


      async function fetchAppointments() {
        const response = await fetch(`http://127.0.0.1:8000/users/${data && data.id}/won_auctions/`);
        const json = await response.json();
        setAppointmentList(json);
      }

      const combinedData = appointmentList && activeAppointments && appointmentList.map((appointment) => {
        const activeAppointment = activeAppointments.find((appt) => appt.auction === appointment.id);
        if (activeAppointment) {
          return { ...appointment, appointmentStatus: activeAppointment.status };
        } else {
          return { ...appointment, appointmentStatus: null };
        }

     })
       
      

     
    
      useEffect(() => {
        fetchData();
        fetchActiveAppointments();
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


        console.log(combinedData)


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

                    {combinedData && combinedData !== null ? <>

                        {combinedData && combinedData.map((item, index) => (
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
                            {item.appointmentStatus === 'active' ?<Button component={RouterLink} variant='outlined' style={{color: '#4caf50', borderColor: '#4caf50'}}  to={`/buyer/appointments/${item.id}`}>View</Button>
                              : <Button component={RouterLink} variant='outlined' to={`/buyer/appointments/${item.id}`}>Book</Button> }
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
