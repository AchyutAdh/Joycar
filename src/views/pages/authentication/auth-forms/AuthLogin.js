import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';


// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(false);

    const googleHandler = async () => {
        console.error('Login');
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

     //form state----------------------------------------------------------------------

     const [formData, setFormData] = useState({username: '', password: ''});
     const [loading, setLoading] = useState(false);
 
     //-------------------------------------------------------------------------

    const handleSubmit = async (event) => {

        event.preventDefault();

        const loginData = {
            username: formData.username,
            password: formData.password
        }


        try {

        setLoading(true);

          const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(loginData),
          });

          const data = await response.json();
          const token = data.token;

          if(response.ok) {
            localStorage.setItem('access_token', token);
          }
          
      
          if (!response.ok) {
            throw new Error('Failed to create user');
          }

          navigate('/dashboard');
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
                            disableElevation
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            variant="outlined"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Sign in with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
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
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

          
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth  sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="username"
                                name="username"
                                label="Username"
                                inputProps={{}}
                                value={formData.username}
                                onChange={(event) => { setFormData({ ...formData, username: event.target.value }); }}
                            />
                          
                        </FormControl>

                        <FormControl
                            fullWidth
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
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
                                label="Password"
                                inputProps={{}}
                                value={formData.password}
                                onChange={(event) => { setFormData({ ...formData, password: event.target.value }); }}
                            />
                          
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                Forgot Password?
                            </Typography>
                        </Stack>
                       

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                            {formData.password === '' ? 
                                <><Button fullWidth size="large" disabled variant="contained"color="secondary">Sign In</Button></>
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
                                    Sign In
                                </Button>
                                </>}
                            </AnimateButton>
                        </Box>
                    </form>
              
        </>
    );
};

export default FirebaseLogin;
