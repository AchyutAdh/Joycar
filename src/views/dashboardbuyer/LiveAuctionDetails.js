import { useEffect, useState } from 'react';
import { Navigate, Link as RouterLink, useParams } from 'react-router-dom';

// material-ui
import { Grid, Stack, Table, Divider, TableBody, TableContainer, TableRow, TableCell, TableHead, Box, Tooltip, Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import LiveAuctionCard from './LiveAuctionCard';
import DetailsImage from './DetailsImage';
import DetailsCard from './DetailsCard';

// ==============================|| DEFAULT LiveAuction ||============================== //

const LiveAuctionDetails = () => {
   

    const params = useParams()
    const id = params.id


    const [data, setData] = useState(null);
    const [bids, setBids] = useState(null);



    function getHighestBid(bids) {
        if (!bids || bids.length === 0) {
          return null;
        }
      
        let highestBid = bids[0];
      
        for (let i = 1; i < bids.length; i++) {
          if (parseFloat(bids[i].price) > parseFloat(highestBid.price)) {
            highestBid = bids[i];
          }
        }
      
        return highestBid;
      }
      
    


    async function fetchData() {
        const response = await fetch(`http://127.0.0.1:8000/auctions/${id}/`);
        const json = await response.json();
        setData(json);
      }

      async function fetchDataBids() {
        const response = await fetch(`http://127.0.0.1:8000/auctions/${id}/bids/`);
        const json = await response.json();
        const highestBid = getHighestBid(json);
        setBids(highestBid);
      }

    
    
      useEffect(() => {
        fetchData();
        fetchDataBids();
      }, []);


    

    if (localStorage.getItem('access_token') === null) {
        return <Navigate to="/login" />;
      }

      const userType = localStorage.getItem('user');
     
      if (userType !== 'buyer') {
          return <Navigate to={`/seller/dashboard`} />;
        }


    return (
<>
        <Grid container spacing={3} sx={{mt: 2}}>
            <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                 <DetailsImage data={data && data}  bids={bids && bids}/>
                </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                    <DetailsCard data={data && data} bids={bids && bids}/>
                </Stack>
            </Grid>
   
        </Grid>

        </>
    
    );
};

export default LiveAuctionDetails;
