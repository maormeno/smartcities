import { ReactElement, FC } from 'react';
import EmergenciesTable from '../components/EmergenciesTable';
import { Box } from '@mui/material';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const Emergencies: FC<any> = (): ReactElement => {
  const clientIdEnv = process.env.REACT_APP_CLIENT_ID
    ? process.env.REACT_APP_CLIENT_ID
    : 'NONE';
  const userPoolIdEnv = process.env.REACT_APP_USER_POOL_ID
    ? process.env.REACT_APP_USER_POOL_ID
    : 'NONE';

  const verifier = CognitoJwtVerifier.create({
    // region: 'us-east-1',
    userPoolId: userPoolIdEnv,
    tokenUse: 'access',
    clientId: clientIdEnv,
    // tokenExpiration: 3600,
  });

  const accessTokenLocal = localStorage.getItem('accessToken');
  const accessToken = accessTokenLocal ? accessTokenLocal : 'NONE';
  const idToken = localStorage.getItem('idToken');

  // const token = {localStorage.getItem('idToken'), process.env.REACT_APP_CLIENT_ID};
  if (accessToken === 'NONE' || idToken === 'NONE') {
    window.location.href = '/';
  } else {
    verifier.verify(accessToken).then((res) => {
      alert('SUCCESSFULY LOGGED IN');
    });
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'whitesmoke',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <EmergenciesTable />
    </Box>
  );
};

export default Emergencies;
