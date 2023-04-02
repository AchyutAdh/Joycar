import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// material-ui
import { Grid } from '@mui/material';

// project imports

import { gridSpacing } from 'store/constant';
// project imports
import MyBids from './MyBids';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import LiveAuctionList from './LiveAuctionList';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
   
    const [isLoading, setLoading] = useState(true);

    const token = localStorage.getItem('access_token')


    const [data, setData] = useState(null);
    const [bidList, setBidList] = useState(null);


    function filterUsersByID(CarList, ID) {
        return CarList.filter(car => car.user === ID);
      }

    
      function getHighestAuctions(auctions) {
        if (!auctions || auctions.length === 0) {
          return null;
        }
      
        const auctionIds = [...new Set(auctions.map(auction => auction.auction))];
        const highestAuctions = [];
      
        for (let i = 0; i < auctionIds.length; i++) {
          const filteredAuctions = auctions.filter(auction => auction.auction === auctionIds[i]);
      
          if (filteredAuctions.length === 0) {
            continue;
          }
      
          let highestAuction = filteredAuctions[0];
      
          for (let j = 1; j < filteredAuctions.length; j++) {
            if (parseFloat(filteredAuctions[j].price) > parseFloat(highestAuction.price)) {
              highestAuction = filteredAuctions[j];
            }
          }
      
          highestAuctions.push(highestAuction);
        }
      
        return highestAuctions;
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


      async function fetchBidList() {
        const response = await fetch('http://127.0.0.1:8000/bids/');
        const json = await response.json();
        const filteredCarList = filterUsersByID(json, data.id);
        const highestAuctions = getHighestAuctions(filteredCarList);
        setBidList(highestAuctions);
      }

     
    
      useEffect(() => {
        fetchData();
        setLoading(false);
      }, []);

      if (bidList === null) {
        fetchBidList();
      }


    if (localStorage.getItem('access_token') === null) {
        return <Navigate to="/login" />;
      }

      const userType = localStorage.getItem('user');
     
      if (userType !== 'buyer') {
          return <Navigate to={`/seller/dashboard`} />;
        }


       

    return (
        <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <MyBids isLoading={isLoading} data={bidList && bidList.length} />
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <LiveAuctionList isLoading={isLoading} data={bidList && bidList.length}/>
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
                    <TotalGrowthBarChart data={bidList && bidList} isLoading={isLoading} />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    );
};

export default Dashboard;
