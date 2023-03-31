import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// mui
import { Card, Grid, TextField, Button, Stack, CardContent, Avatar, Box } from '@mui/material';

import { InputAdornment } from '@mui/material';




export default function AccountSettingsForm() {


    const token = localStorage.getItem('access_token')
    const userType = localStorage.getItem('user');

    const navigate = useNavigate();

    const [, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({old: '', new: ''});


    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    


    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordData = {
            old_password: formData.old, 
            new_password: formData.new
        };



        try {
    
              const response = await fetch('http://127.0.0.1:8000/api/change-password/', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
                  'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(passwordData),
              });
    
            if (response.status === 200) {
                await response.json();
                navigate(`/${userType}/dashboard`);
                window.location.reload();
              } else {
                setFormData({old: '', new: ''})
              }
              setLoading(false);
              // Handle successful user creation
            } catch (error) {
              console.error(error);
              setLoading(false);
              setFormData({old: '', new: ''})
              setImgUrl(null)
              // Handle error
            }
    }



    
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


      useEffect(() => {
        fetchData();
      }, []);




  return (
    <>



<form onSubmit={handleSubmit}>
      <Grid container spacing={3}>

      <Grid item xs={12} md={4}>
        <Card sx={{ py: 1, px: 1, textAlign: 'center', boxShadow: 3 }}>
            <CardContent>
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 8}}>

            <Avatar
                alt=""
                src=""
                sx={{
                    width: 64,
                    height: 64,
                    zIndex: 11,
                    position: 'absolute',
                    bottom: -42,
                }}
                />

                </Box>
            

            
            <Button variant="contained" size="small">Change</Button>
            </CardContent>

          </Card>
        
        </Grid>
        


        <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, boxShadow: 1 }}>
                <Grid container spacing={2}>
                {data !== null ?
                <>
                <Grid item xs={6} >
                  <TextField placeholder="Username" id="name" label="Username" variant="outlined" fullWidth autoComplete='off' InputProps={{ readOnly: true,}}  defaultValue={data.username} />
                </Grid>

                <Grid item xs={6} >
                  <TextField placeholder="Email" id="Email" label="Email" variant="outlined" fullWidth autoComplete='off' InputProps={{ readOnly: true,}} defaultValue={data.email} />
                </Grid> 
                </>

                :

                null}
                

                {expanded !== true ? (
                        <Grid item xs={12}>
                            <TextField
                            type="password"
                            id="dummy"
                            label="Password"
                            placeholder="Password"
                            variant="outlined"
                            fullWidth
                           
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                <InputAdornment position="end">
                                    {expanded !== true ? (
                                    <Button onClick={handleExpandClick} variant="outlined">
                                        Change
                                    </Button>
                                    ) : null}
                                </InputAdornment>
                                ),
                            }}
                            defaultValue={'dnjaskdnjakjdnkjandkjnkj'}
                            />
                        </Grid>
                        ) : (
                        <>
                            <Grid item xs={6}>
                            <TextField
                                type="password"
                                id="old"
                                label="Old Password"
                                placeholder="Old Password"
                                variant="outlined"
                                fullWidth
                                onChange={e => setFormData({...formData, old: e.target.value})} value={formData.old}
                                required
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                type="password"
                                id="new"
                                label="New Password"
                                placeholder="New Password"
                                variant="outlined"
                                fullWidth
                                onChange={e => setFormData({...formData, new: e.target.value})} value={formData.new}
                                required
                            />
                            </Grid>
                        </>
                        )}
    
                 
                 

                <Grid item xs={6} />
                <Grid item xs={6}>
                    <Stack spacing={3} mt={2} direction="row" justifyContent="flex-end">
                        {formData.new || formData.old !== '' ?
                    <Button  type="submit" variant="contained" size="large">
                        Create
                    </Button>
                    :
                    <Button  disabled variant="contained" size="large">
                        Create
                    </Button>
                    }
                    </Stack>
                </Grid>
                </Grid>
            </Card>
            </Grid>

        

        
        
      </Grid>
      </form>
    </>
  );
}