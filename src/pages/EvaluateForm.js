import { useState, useEffect } from "react";
// mui
import { Card, Grid, TextField, Button, Stack, FormControl, InputLabel, MenuItem, Select, InputAdornment, Typography } from '@mui/material';

export default function EvaluateForm() {

    const [formData, setFormData] = useState({name: '', year: '', km: ''});
    const [fuelType, setFuelType] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangeFuel = (event) => {
        setFuelType(event.target.value);
    };

    const handleRe = () => {
        setPrice('');
        setFuelType('');
        setFormData({name: '', year: '', km: ''})
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const evaluateData = {
          car_name: formData.name,
          year: Number(formData.year),
          kms_driven: Number(formData.km),
          fuel_type: fuelType
        };

        try {
    
            setLoading(true);
            const response = await fetch('http://127.0.0.1:8000/predict_price/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(evaluateData),
            });
  

            if (response) {
              const data = await response.json();
              if(data) {
                const evaluated_price = data.selling_price
                const updated_price = (evaluated_price*(2)*(2)*(1.6))
                setPrice(updated_price.toString());
              }
              setLoading(false);
            } else {
              setFormData({name: '', year: '', km: ''})
              setLoading(false);
            }
    
            // Handle successful user creation
          } catch (error) {
            console.error(error);
            etFormData({name: '', year: '', km: ''})
              setLoading(false);
          }
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start',  height: '55vh'}}>
            {loading ? <>Evaluating Please wait...</> : 
            <>
            {price !== '' ?
            <>
             <Grid container>
                <Grid item>
                    <Card sx={{ p: 5, boxShadow: 1, fontSize: '2.5rem'}}>
                        <Typography variant="title" component="h1">Your evaluated price is </Typography>
                        <Typography variant="title" component="h1"><span style={{color: 'green'}}>Rs. {price && (price.split('.')[0]).replace('-', '')} lakhs</span></Typography>
                        <Button variant="outlined" sx={{mt: 3}} onClick={handleRe}>Re-Evaluate</Button>
                    </Card>
                </Grid>
            </Grid>
            </> 
            :
            <form onSubmit={handleSubmit}>
                <Grid container >
                    <Grid item >
                        <Card sx={{ p: 3, boxShadow: 1 }}>
                           
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField placeholder="Toyota" id="name" label="Name" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField type="number" placeholder="2001" id="year" label="Year" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, year: e.target.value})} value={formData.year}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField type="number" placeholder="Driven (in Km)" id="km" label="Drive(in Km)" variant="outlined" fullWidth required autoComplete='off' InputProps={{ endAdornment: ( <InputAdornment position="end"> Km </InputAdornment> ), }} onChange={e => setFormData({...formData, km: e.target.value})} value={formData.km}/>
                                </Grid>

                                <Grid item xs={12} >
                                    <FormControl fullWidth required autoComplete='off'>
                                        <InputLabel id="category">Fuel Type</InputLabel>
                                        <Select
                                        labelId="car-category"
                                        id="car-category"
                                        label="Fuel Type"
                                        fullWidth required autoComplete='off'
                                        value={fuelType}
                                        onChange={handleChangeFuel}
                                        >
                                            <MenuItem value="Diesel">
                                               Diesel     
                                            </MenuItem>
                                            <MenuItem value="Petrol">
                                              Petrol   
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    </Grid>

                               
                            </Grid>
                        </Card>

                        <Stack spacing={3} mt={2}>
                            <Button type="submit" variant="contained" size="large">
                                Evaluate
                            </Button>
                        </Stack>
                    </Grid>

                  
                </Grid>
            </form>
            }
            </>
            }
        </div>
    );
}