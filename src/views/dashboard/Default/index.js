import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// material-ui
import { Grid } from '@mui/material';

// project imports

import { gridSpacing } from 'store/constant';
// project imports
import ListedCars from './ListedCars';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);

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
        const response = await fetch('http://127.0.0.1:8000/cars/');
        const json = await response.json();
        const filteredCarList = filterCarsByID(json, data.id);
        setCarList(filteredCarList);
      }
    
      useEffect(() => {
        fetchData();
        setLoading(false);
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
        <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <ListedCars isLoading={isLoading} data={carList && carList.length} />
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <TotalOrderLineChartCard isLoading={isLoading} />
                </Grid>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={6} xs={12} md={6} lg={12}>
                            <TotalIncomeDarkCard isLoading={isLoading} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={6} lg={12}>
                            <TotalIncomeLightCard isLoading={isLoading} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} >
                    <TotalGrowthBarChart data={carList && carList} isLoading={isLoading} />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    );
};

export default Dashboard;
