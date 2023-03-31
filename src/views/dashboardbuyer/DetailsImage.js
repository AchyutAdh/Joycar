import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Collapse, Card, CardContent, CardActions, CardMedia} from '@mui/material';

import { useParams, useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------


export default function DetailsImage({ bids , dataImg}) {

  const token = localStorage.getItem('access_token')

  const params = useParams()
  const id = params.id
  
  
  const navigate = useNavigate();
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

          await response.json();
    
          navigate('/buyer/mybids');
          window.location.reload();
          setLoading(false);
          // Handle successful user creation
        } catch (error) {
          console.error(error);
          setLoading(false);
          setFormData({price: ''})
         
        }
}



useEffect(() => {
  fetchData();
}, []);


  return (

    <>

<Card sx={{ py: 1, px: 1, textAlign: 'center', boxShadow: 3 }}>
         
            <>
            <CardMedia
                component="img"
                height="194"
                image={dataImg && dataImg.car && dataImg.car.image}
                component="img"
            />
            </>
     

          </Card>

          <Card>

            <form onSubmit={handleSubmit}>
             
          {expanded !== true ?
              <CardActions disableSpacing>        
                 <Button expand={expanded}onClick={handleExpandClick}aria-expanded={expanded} fullWidth variant="contained">Bid Now</Button>
              </CardActions>
            : null}

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
                <Button variant="contained" type="submit" fullWidth>Bid Now</Button>
              </CardActions>
              : null}
              </Collapse>
              </form>
            </Card>
          
    </>
  );
}