import { useContext } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { AuthContext } from '../context/auth.context';
import { Button, useBreakpointValue } from '@chakra-ui/react';

function Logout() {
  const { logoutUser } = useContext(AuthContext);
  const buttonText = useBreakpointValue({
    sm: 'Logout',
    base: '',
  });

  return (
    <>
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme="yellow"
        variant="solid"
        onClick={logoutUser}
      >
        {buttonText}
      </Button>
    </>
  );
}

export default Logout;
