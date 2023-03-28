import { useEffect, useState } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';

// material-ui
import { Card, Typography, Table, Divider, TableBody, TableContainer, TableRow, TableCell, TableHead, Box, Tooltip, Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| DEFAULT ListCar ||============================== //

const ListCar = () => {
   

    const token = localStorage.getItem('access_token')


    const [data, setData] = useState(null);
    const [carList, setCarList] = useState(null);


    function filterCarsByID(CarList, ID) {
        return CarList.filter(car => car.user === ID);
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


      async function fetchCarList() {
        const response = await fetch('http://127.0.0.1:8000/api/cars/');
        const json = await response.json();
        const filteredCarList = filterCarsByID(json, data.id);
        setCarList(filteredCarList);
      }
    
      useEffect(() => {
        fetchData();
      }, []);

      if (carList === null) {
        fetchCarList();
      }


    if (localStorage.getItem('access_token') === null) {
        return <Navigate to="/login" />;
      }

      const userType = localStorage.getItem('user');
     
      if (userType !== 'seller') {
          return <Navigate to={`/buyer/dashboard`} />;
        }



    return (
        <MainCard title="Listed Cars">

            <TableContainer>
           
              <Table>
              <TableHead>
              
              <TableRow>
                    <TableCell align="center">
                       Name
                    </TableCell>

                    <TableCell align="center">
                       Model
                    </TableCell>

                    <TableCell align="center">
                       Year
                    </TableCell>

                    <TableCell align="center">
                       Price
                    </TableCell>

                    <TableCell align="center">
                      Status
                    </TableCell>
                 

                </TableRow>

                </TableHead>

                      <TableBody>

                    {carList && carList !==null ? <>

                        {carList && carList.map((item) => (
                        <TableRow hover align="center" key={item.id}>

                            <TableCell align="center">
                            <Typography>
                               {item.name}
                            </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography>
                                 {item.model}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography >
                                  {item.year}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                             {item.price.split('.')[0]}
                            </TableCell>

                            <TableCell align="center">
                              <span style={{textTransform: 'capitalize'}}>{item.status}</span>
                            </TableCell>
    
                        </TableRow>
                        ))}
                        </>
                        
                    : null}
              
                </TableBody>
              </Table>
               
            </TableContainer>


            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Tooltip title="List car" placement="left">
                <Fab component={RouterLink} to="/seller/carlist/create" color="primary" style={{ position: "fixed", bottom: 10, right: 25}}>
                  <AddIcon/>
                </Fab>
              </Tooltip>
          </Box>
       
    </MainCard>
    );
};

export default ListCar;
