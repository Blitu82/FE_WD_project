// import Signup from './Signup';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ArrowForwardIcon } from '@chakra-ui/icons';
import { login } from '../api/auth.api';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { AuthContext } from '../context/auth.context';
import { Button, useDisclosure } from '@chakra-ui/react';

// From https://chakra-ui.com/docs/components/modal/usage

function Logout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { storeToken, authenticateUser, logoutUser } = useContext(AuthContext);

  // From https://chakra-ui.com/docs/components/editable
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
