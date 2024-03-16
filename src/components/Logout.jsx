import { useContext } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { AuthContext } from '../context/auth.context';
import { Button } from '@chakra-ui/react';

function Logout() {
  const { logoutUser } = useContext(AuthContext);

  return (
    <>
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme="yellow"
        variant="solid"
        onClick={logoutUser}
      >
        Logout
      </Button>
    </>
  );
}

export default Logout;
