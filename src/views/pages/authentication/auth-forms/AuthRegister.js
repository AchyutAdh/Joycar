import { useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';



// project imports
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    //form state----------------------------------------------------------------------

    const [formData, setFormData] = useState({username: '', email: '', password: ''});
    const [loading, setLoading] = useState(false);

    //-------------------------------------------------------------------------
   
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);

  

    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    

    const handleSubmit = async (event) => {

        event.preventDefault();

        const registerData = {
            email: formData.email,
            username: formData.username,
            password: formData.password
        }


        try {

        setLoading(true);

          const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(registerData),
          });

          
      
          if (!response.ok) {
            throw new Error('Failed to create user');
          }

          navigate('/login');
          setLoading(false);
          // Handle successful user creation
        } catch (error) {
          console.error(error);
          setLoading(false);
          setFormData({username: '', email: '', password: ''})
          // Handle error
        }
      };

   

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Sign up with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    margin="normal"
                                    name="username"
                                    sx={{ ...theme.typography.customInput }}
                                    value={formData.username}
                                    onChange={(event) => { setFormData({ ...formData, username: event.target.value }); }}
                                />
                            </Grid>
                        </Grid>
                        <FormControl fullWidth  sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={formData.email}
                                name="email"
                                onChange={(event) => { setFormData({ ...formData, email: event.target.value }); }}
                                inputProps={{}}
                            />
                            
                        </FormControl>

                        <FormControl
                            fullWidth
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                name="password"
                                label="Password"
                                onChange={(event) => { setFormData({ ...formData, password: event.target.value }); }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                    
                        </FormControl>

                        
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                       

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                {formData.password === '' ? 
                                <><Button fullWidth size="large" disabled variant="contained"color="secondary">Sign Up</Button></>
                                :
                                <>
                                <Button
                                    disableElevation
                                    disabled={loading === true ? true : false}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                                </>}
                            </AnimateButton>
                        </Box>
                    </form>
           
        </>
    );
};

export default FirebaseRegister;
