import { useEffect, useState } from 'react';
import { Navigate  } from 'react-router-dom';

// material-ui
import { Box } from '@mui/material';
import LiveAuctionCard from './LiveAuctionCard';

// ==============================|| DEFAULT LiveAuction ||============================== //

const LiveAuction = () => {
   


    const [data, setData] = useState(null);
    


    async function fetchData() {
        const response = await fetch('http://127.0.0.1:8000/auctions/active/', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const json = await response.json();
        setData(json);
      }

    
      useEffect(() => {
        fetchData();
      }, []);




    if (localStorage.getItem('access_token') === null) {
        return <Navigate to="/login" />;
      }

      const userType = localStorage.getItem('user');
     
      if (userType !== 'buyer') {
          return <Navigate to={`/seller/dashboard`} />;
        }


    return (

        <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >

        {data && data !== null && data.map((auction) => (
                <LiveAuctionCard key={auction.id} data={auction} />
            ))}
    
    </Box>
        
    );
};

export default LiveAuction;
