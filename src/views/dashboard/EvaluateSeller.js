import EvaluateForm from 'pages/EvaluateForm';
import { Navigate, Link as RouterLink } from 'react-router-dom';

import MainCard from 'ui-component/cards/MainCard';

// ==============================|| DEFAULT EvaluateSeller ||============================== //

const EvaluateSeller = () => {
   


    if (localStorage.getItem('access_token') === null) {
        return <Navigate to="/login" />;
      }

      const userType = localStorage.getItem('user');
     
      if (userType !== 'seller') {
          return <Navigate to={`/buyer/dashboard`} />;
        }



    return (
        <MainCard title="Evaluate">

        <EvaluateForm />

        </MainCard>
    );
};

export default EvaluateSeller;
