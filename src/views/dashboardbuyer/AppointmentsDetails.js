import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

// material-ui
import { Grid, Stack  } from '@mui/material';

// project imports
import AppointmentsCard from './appointments/AppointmentsCard';
import BookAppointment from './appointments/BookAppointment';

// ==============================|| DEFAULT AppointmentsDetails ||============================== //

const AppointmentsDetails = () => {
   

    const token = localStorage.getItem('access_token')

    const params = useParams();
    const id = params.id;
  
  

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


      function findAppointmentByID(array, ID) {
        const appointment = array.find(appointment => appointment.id === ID);
        return appointment;
      }
      
      async function fetchAppointments() {
        const response = await fetch(`http://127.0.0.1:8000/users/${data && data.id}/won_auctions/`);
        const json = await response.json();
        const combinedData = json && activeAppointments && json.map((appointment) => {
          const activeAppointment = activeAppointments.find((appt) => appt.auction === appointment.id);
          if (activeAppointment) {
            return { ...appointment, appointmentStatus: activeAppointment.status, appointmentDate:  activeAppointment.date};
          } else {
            return { ...appointment, appointmentStatus: null, appointmentDate:  null };
          }
  
       })
       const dataMain = findAppointmentByID(combinedData, Number(id));
       setAppointmentList(dataMain);
      }


     
    
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


     


    return (
        <>

        <Grid container spacing={3} sx={{mt: 2}}>
            <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                 <AppointmentsCard data={appointmentList && appointmentList}/>
                </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                  <BookAppointment data={appointmentList && appointmentList}/>
                </Stack>
            </Grid>
   
        </Grid>
          
       
    </>
    );
};

export default AppointmentsDetails;
