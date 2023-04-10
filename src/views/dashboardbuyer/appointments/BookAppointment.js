import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Card, CardContent, Button, CardActions, Stack, Typography} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//-----------------------------------


export default function BookAppointment({data}) {


  const navigate = useNavigate();

  const [date, setDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
        date: date.format('YYYY-MM-DD'),
        auction: Number(data.id),
        status: "active"
    };


    try {

          const response = await fetch(`http://127.0.0.1:8000/appointments/create/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
             
            },
            body: JSON.stringify(appointmentData),
          });

          if(response.ok) {
           navigate('/buyer/appointments')
         }
        
     
         if (!response.ok) {
            setDate(null)
         }
    
         
          // Handle successful user creation
        } catch (error) {
          console.error(error);
          setDate(null)
        }
  };


  
  return (

    <>



    <Card sx={{ py: 1, px: 1, textAlign: 'center', boxShadow: 3 }}>

          {data && data.appointmentStatus !== 'active' ? 
            <form onSubmit={handleSubmit}>

              <CardContent>
              <Grid >
                <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']} >
                    <DatePicker sx={{ width: '100%' }} label="Select Appointment Date" value={date} onChange={(dates) => setDate(dates)}>
                    {({ inputRef, inputProps, ...other }) => ( <TextField {...inputProps} inputRef={inputRef} fullWidth /> )}
                      </DatePicker>
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                </Grid>
              </CardContent>
                
              <CardActions disableSpacing>
                <Button variant="contained" type="submit" fullWidth>Book</Button>
              </CardActions>
            
              </form>

          :


          <CardContent>
          <Grid >
            <Grid item xs={12}>
              <Stack direction="row">
        
              <Typography variant="body2">
                <span  style={{fontWeight: 'bold'}}>Appointment Date:</span> <span style={{ textTransform: 'capitalize' }}>{data && data.appointmentDate}</span>
              </Typography>
            </Stack>

            </Grid>
                </Grid>
              </CardContent>

            }

            </Card>
          
    </>
  );
}