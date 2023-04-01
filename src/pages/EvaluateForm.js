
// mui
import { Card, Grid, TextField, Button, Stack, FormControl, InputLabel, MenuItem, Select, InputAdornment } from '@mui/material';

export default function EvaluateForm() {

    

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginRight: '5rem', height: '55vh'}}>
            <form>
                <Grid container >
                    <Grid item >
                        <Card sx={{ p: 3, boxShadow: 1 }}>
                           
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField placeholder="Toyota" id="name" label="Name" variant="outlined" fullWidth required autoComplete='off' />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField type="number" placeholder="2001" id="year" label="Year" variant="outlined" fullWidth required autoComplete='off' />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField type="number" placeholder="Driven (in Km)" id="km" label="Drive(in Km)" variant="outlined" fullWidth required autoComplete='off' InputProps={{ endAdornment: ( <InputAdornment position="end"> Km </InputAdornment> ), }}/>
                                </Grid>

                                <Grid item xs={12} >
                                    <FormControl fullWidth required autoComplete='off'>
                                        <InputLabel id="category">Fuel Type</InputLabel>
                                        <Select
                                        labelId="car-category"
                                        id="car-category"
                                        label="Fuel Type"
                                        fullWidth required autoComplete='off'
                                        >
                                            <MenuItem value="disel">
                                               Disel     
                                            </MenuItem>
                                            <MenuItem value="petrol">
                                              Petrol   
                                            </MenuItem>
                                            <MenuItem value="ev">
                                               EV  
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
        </div>
    );
}