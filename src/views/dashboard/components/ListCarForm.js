import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// mui
import { Card, Grid, TextField, Button, Stack, CardMedia, CardContent, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';



//------------------Alert

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//-----------------------------------

export default function ListCarForm() {


    const token = localStorage.getItem('access_token')

    const navigate = useNavigate();


    //--------------------Alert State
   const [open, setOpen] = useState(false);
   const [butt, setButt] = useState(false);


   const handleClose = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
 
     setOpen(false);
   };


    const [, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({name: '', model: '', year: '', price: '', description: ''});


     //------------------content image-------------------------
     const [imgPreview, setImgPreview] = useState(null);
     const [imgUrl, setImgUrl] = useState(null);
     //---------------------------------------------------------

     //Converting data URL (base64)
     const convertBase64 = (file) => {
         return new Promise((resolve, reject) => {
         const fileReader = new FileReader();
         fileReader.readAsDataURL(file);

         fileReader.onload = () => {
             resolve(fileReader.result);
         };

         fileReader.onerror = (error) => {
             reject(error);
         };
         });
     };

        //Changing state for image
        const handleInputChangeImage = async (e) => {
            const img = e.target.files[0];
            const base64img = await convertBase64(img)
            setImgUrl(base64img);
            setImgPreview(URL.createObjectURL(img));

        }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const carData = {
          name: formData.name,
          model: formData.model,
          year: formData.year,
          price: formData.price,
          description: formData.description,
          status: 'inactive',
          user: data.id,
          image: imgUrl,
        };



        try {
    
              const response = await fetch('http://127.0.0.1:8000/cars/create/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
                  'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(carData),
              });
    

              if (response.ok) {
                // Handle successful response
                setButt(true);
                setTimeout(() => {
                  navigate('/seller/carlist');
                }, 5000); // reload after 5 seconds
                setOpen(true);
                setLoading(false);
              } else {
                setFormData({name: '', model: '', year: '', price: '', description: ''})
                setLoading(false);
                setImgUrl(null)
                setButt(false);
              }
      
              // Handle successful user creation
            } catch (error) {
              console.error(error);
              setLoading(false);
              setFormData({name: '', model: '', year: '', price: '', description: ''})
              setImgUrl(null)
              setButt(false);
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

    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}>
            <Alert onClose={handleClose} severity="success" style={{ backgroundColor: '#4caf50', color: '#fff' }}  sx={{ width: '100%' }}>
               Listed successfully!
            </Alert>
          </Snackbar>


    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, boxShadow: 1}}>
          <Grid container spacing={2} >
              <Grid item xs={6} >
                  <TextField placeholder="Toyota" id="name" label="Name" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name}/>
                </Grid>

                <Grid item xs={6} >
                  <TextField placeholder="Series 1" id="model" label="Model" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, model: e.target.value})} value={formData.model}/>
                </Grid> 
                

                <Grid item xs={6} >
                  <TextField  type="number" placeholder="2001" id="year" label="Year" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, year: e.target.value})} value={formData.year}/>
                </Grid> 
                

                <Grid item xs={6} >
                  <TextField InputProps={{ inputProps: { min: 1 } }} placeholder="1000000" id="price" label="Price" type="number" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, price: e.target.value})} value={formData.price}/>
                </Grid>


                <Grid item xs={12}>
                  <TextField label="Description"  multiline rows={5} placeholder="This is the description" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, description: e.target.value})} value={formData.description}/>
                </Grid>

                </Grid>
           
          </Card>
        </Grid>

        

        <Grid item xs={12} md={4}>
        <Card sx={{ py: 1, px: 1, textAlign: 'center', boxShadow: 3 }}>
            <input accept="image/png, image/jpeg" id="upload-content-avatar" required hidden type="file" onChange={(e) => handleInputChangeImage(e)} />
            <label htmlFor="upload-content-avatar">
            {imgPreview !== null ?
            <>
            <CardMedia
                component="img"
                height="194"
                image={imgPreview}
                style={{cursor:'pointer'}}
            />
            </>
            : null}
  
    {imgPreview !== null ? null : 
            <CardContent>
                <Button variant="outlined" component="div">
                   Upload an Image
                </Button>
            </CardContent>
        }
            </label>
  
          </Card>

          <Stack spacing={3} mt={2}>

            {butt === true ? <Button variant="contained" size="large" disabled fullWidth sx={{ '&.Mui-disabled': { color: 'black' } }}>Redirecting...</Button> : <Button type="submit" variant="contained" size="large">Create</Button> }
           </Stack>

        </Grid>
        
      </Grid>
    </form>
    </>
  );
}