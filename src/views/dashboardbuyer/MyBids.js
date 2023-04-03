import { useEffect, useState } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';

// material-ui
import { Card, Typography, Table,  TableBody, TableContainer, TableRow, TableCell, TableHead, Box, Tooltip, Fab, Button  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| DEFAULT MyBids ||============================== //

const MyBids = () => {
   

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
        <MainCard title="My Bids">

            <TableContainer>
           
              <Table>
              <TableHead>
              
              <TableRow>

              <TableCell align="center">
                       S.N
                    </TableCell>
                    <TableCell align="center">
                       Auction ID
                    </TableCell>

                    <TableCell align="center">
                       Car Name
                    </TableCell>

                    <TableCell align="center">
                       Price
                    </TableCell>

                    <TableCell align="center">
                      Bid Date
                    </TableCell>

                    <TableCell align="center">
                      Actions
                    </TableCell>
                 

                </TableRow>

                </TableHead>

                      <TableBody>

                    {bidList && bidList !== null ? <>

                        {bidList && bidList.map((item, index) => (
                        <TableRow hover align="center" key={item.id}>

                            <TableCell align="center">

                            <Typography>
                              {index + 1}
                            </Typography>
                            </TableCell>

                            <TableCell align="center">
                              
                            <Typography>
                               {item.auction}
                            </Typography>
                            </TableCell>

                            <TableCell align="center">
                              
                            <Typography>
                               <span style={{textTransform: 'capitalize'}}>{item.car_name}</span>
                            </Typography>
                            </TableCell>

                            <TableCell align="center">
                             {item.price.split('.')[0]}
                            </TableCell>

                            <TableCell align="center">
                              {item.created_at.split('T')[0]}
                            </TableCell>
    

                            <TableCell align="center">
                              <Button component={RouterLink} variant='outlined' to={`/buyer/liveauction/${item.auction}`}>View</Button>
                            </TableCell>


                        </TableRow>
                        ))}
                        </>
                        
                    : null}
              
                </TableBody>
              </Table>
               
            </TableContainer>


          
       
    </MainCard>
    );
};

export default MyBids;
