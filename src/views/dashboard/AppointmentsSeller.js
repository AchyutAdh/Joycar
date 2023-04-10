import { useEffect, useState } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';

// material-ui
import { Card, Typography, Table,  TableBody, TableContainer, TableRow, TableCell, TableHead,  Button  } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

// ==============================|| DEFAULT AppointmentsSeller ||============================== //

const AppointmentsSeller = () => {
   

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


      async function fetchAuctions() {
        const response = await fetch(`http://127.0.0.1:8000/users/${data && data.id}/auctions/`);
        const json = await response.json();
        setAppointmentList(json);
      }


      const combinedData = appointmentList && activeAppointments && appointmentList.map((appointment) => {
        const activeAppointment = activeAppointments.find((appt) => appt.auction === appointment.id);
        if (activeAppointment) {
          return { ...appointment, appointmentStatus: activeAppointment.status, appointmentDate:  activeAppointment.date };
        } else {
          return { ...appointment, appointmentStatus: null, appointmentDate:  null };
        }

     })

   
     const filteredList = combinedData && combinedData.filter((appointment) => {
      const isActive = appointment.appointmentStatus === 'active';
      const hasSellerName = appointment.seller_name === data.username;
      return isActive && hasSellerName;
    });
   
    
  
       
      

     
    
      useEffect(() => {
        fetchData();
        fetchActiveAppointments();
      }, []);

      if (appointmentList === null) {
        fetchAuctions();
      }


    if (localStorage.getItem('access_token') === null) {
        return <Navigate to="/login" />;
      }

      const userType = localStorage.getItem('user');
     
      if (userType !== 'seller') {
          return <Navigate to={`/buyer/dashboard`} />;
        }


        console.log(filteredList)



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
                       Buyer
                    </TableCell>

                    <TableCell align="center">
                      Appointment Date
                    </TableCell>

                 

                </TableRow>

                </TableHead>

                      <TableBody>

                    {filteredList && filteredList !== null ? <>

                        {filteredList && filteredList.map((item, index) => (
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
                                <span style={{textTransform: 'capitalize'}}>{item.winner}</span>
                            </Typography>
                            </TableCell>

                            <TableCell align="center">
                              {item.appointmentDate}
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

export default AppointmentsSeller;
