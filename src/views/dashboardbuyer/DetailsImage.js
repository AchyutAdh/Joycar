import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Collapse, Card, CardContent, CardActions, CardMedia, Snackbar, Stack, Typography} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------


//------------------Alert

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//-----------------------------------


export default function DetailsImage({ bids , dataImg}) {

  const token = localStorage.getItem('access_token')

  const params = useParams()
  const id = params.id

   //--------------------Alert State
   const [open, setOpen] = useState(false);
   const [butt, setButt] = useState(false);


   const handleClose = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
 
     setOpen(false);
   };

  
  
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({price: ''});
  const [data, setData] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



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


  const handleSubmit = async (e) => {

    e.preventDefault();

    const bidData = {
        user: data && data.id,
        auction: Number(id),
        price: formData.price
    };



    try {

          const response = await fetch(`http://127.0.0.1:8000/auctions/${id}/bid/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(bidData),
          });

          if(response.ok) {
            setButt(true);
            setTimeout(() => {
              window.location.reload();
            }, 5000); // reload after 5 seconds
            setOpen(true);
            setLoading(false);  
         }
        
     
         if (!response.ok) {
           setOpen(true);
           setLoading(false);
           setButt(false);
         }
    
         
          // Handle successful user creation
        } catch (error) {
          console.error(error);
          setLoading(false);
          setFormData({price: ''})
          setButt(false);
        }
}


useEffect(() => {
  fetchData();
}, []);


  return (

    <>



<Card sx={{ py: 1, px: 1, textAlign: 'center', boxShadow: 3 }}>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}>
            <Alert onClose={handleClose} severity="success" style={{ backgroundColor: '#4caf50', color: '#fff' }}  sx={{ width: '100%' }}>
               Bidded successfully!
            </Alert>
          </Snackbar>
         
            <>
            <CardMedia
                component="img"
                height="194"
                image={dataImg && dataImg.car && dataImg.car.image}
            />
            </>
     

          </Card>

          <Card>

            <form onSubmit={handleSubmit}>
             
            {expanded !== true ? (
                <>
                  <CardActions disableSpacing>
                    {dataImg && dataImg.winner && dataImg.winner !== null ? (
                      <Grid container justifyContent="center">
                        <Grid item xs={12}>
                          <Typography variant="body2" align="center" sx={{mb: 1, fontSize: '1rem'}}>
                            <span style={{ fontWeight: 'bold' }}>Winner:</span>{' '}
                            <span style={{ textTransform: 'capitalize' }}>
                              {dataImg.winner}
                            </span>
                          </Typography>
                        </Grid>
                        {data && data.username === dataImg.winner ? (
                          <Grid item xs={12}>
                            <Button variant="contained" fullWidth>
                              Book Appointment
                            </Button>
                          </Grid>
                        ) : null}
                      </Grid>
                    ) : (
                      <Grid container justifyContent="center">
                        <Grid item xs={12}>
                          <Button
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            fullWidth
                            variant="contained"
                          >
                            Bid Now
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </CardActions>
                </>
              ) : null}

              <Collapse in={expanded} timeout="auto" unmountOnExit>

              <CardContent>
              <Grid  >
                <Grid item xs={12}>
                    <TextField id="place_bid" type="number" InputProps={{ inputProps: { min: bids && bids.price, }, }} placeholder="1000000" label="Place your bid" variant="outlined"  fullWidth  autoComplete='off' onChange={e => setFormData({...formData, price: e.target.value})} value={formData.price}/>
                </Grid>
                </Grid>
              </CardContent>
                
              {expanded === true ?
                <CardActions disableSpacing>
                {butt === true ? <Button variant="contained" disabled fullWidth sx={{ '&.Mui-disabled': { color: 'black' } }}>Timeout (5 seconds)</Button> : <Button variant="contained" type="submit" fullWidth>Bid Now</Button> }
              </CardActions>
              : null}
              </Collapse>
              </form>
            </Card>
          
    </>
  );
}