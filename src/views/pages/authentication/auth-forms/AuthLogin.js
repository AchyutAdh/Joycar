import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';


// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



//------------------Alert

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

// ============================|| LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const [checked, setChecked] = useState(false);


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
            localStorage.setItem('user', 'buyer')
            navigate('/buyer/dashboard');
            window.location.reload();
            setLoading(false);
          }
          
      
          if (!response.ok) {
            setOpen(true);
            setFormData({username: '',  password: ''})
            setLoading(false);
          }

          
          
          // Handle successful user creation
        } catch (error) {
          console.error(error);
          setLoading(false);
          setFormData({username: '',  password: ''})
          // Handle error
        }
      };

    return (
        <>
           

          
                    <form noValidate onSubmit={handleSubmit} {...others}>
                  
                   { open && ( <Alert sx={{mb: 2, mt: 2,  width: '100%' }} onClose={handleClose} severity="error"  style={{ backgroundColor: '#f44336', color: '#fff' }} > Invalid username or password. Please try again. </Alert> )}
             

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

export default AuthLogin;
