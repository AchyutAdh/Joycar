import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import {Box, Grid} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false} >
                    <Box sx={{ p: 11.25 }}>
                        <Grid container direction="column"></Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
