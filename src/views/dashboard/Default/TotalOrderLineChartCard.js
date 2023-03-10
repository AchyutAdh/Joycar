import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';


const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',

}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
    

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 11.25 }}>
                        <Grid container direction="column">
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalOrderLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
