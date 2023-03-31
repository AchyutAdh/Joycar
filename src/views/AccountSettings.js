
import { Navigate } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AccountSettingsForm from './AccountSettingsForm';

// ==============================|| DEFAULT AccountSettings ||============================== //

const AccountSettings = () => {


    if (localStorage.getItem('access_token') === null) {
        return <Navigate to="/login" />;
      }



    return (
    <MainCard title="Account Settings">
        
      <AccountSettingsForm/>
       
    </MainCard>
    );
};

export default AccountSettings;
