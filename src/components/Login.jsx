import Signup from './Signup';
import ResetPassword from './ResetPassword';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { login } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import imgUrl from '../assets/logo_example.png';
import {
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

function Login() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const loginSucessToast = () => {
    toast({
      title: 'You are successfully logged in.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const loginErrorToast = errorMessage => {
    toast({
      title: 'Login Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    const user = { email, password };
    try {
      const response = await login(user);
      storeToken(response.data.authToken);
      authenticateUser();
      loginSucessToast();
      navigate('/');
    } catch (error) {
      setError(error.response.data.message);
      // console.log('Error login', error);
      loginErrorToast(error.response.data.message);
      setEmail('');
      setPassword('');
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  const buttonText = useBreakpointValue({
    sm: 'Login',
    base: '',
  });

  // From https://chakra-ui.com/docs/components/editable
  return (
    <>
      <Button
        leftIcon={<ArrowForwardIcon />}
        colorScheme="yellow"
        variant="solid"
        onClick={() => {
          onOpen();
        }}
      >
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <VStack as="header" spacing="0.1" mt="8">
            <Image boxSize="40px" src={imgUrl} alt="logo"></Image>
            <ModalHeader
              as="h1"
              fontWeight="300"
              fontSize="24px"
              letterSpacing="-0.5px"
            >
              Login to OnlyMaps
            </ModalHeader>
          </VStack>
          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" mx="10px">
            <ModalBody>
              <Stack>
                <FormControl>
                  <FormLabel size="sm">Email address</FormLabel>
                  <Input
                    type="email"
                    bg="white"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <HStack justifyContent="space-between">
                    <FormLabel size="sm">Password</FormLabel>
                    <ResetPassword />
                  </HStack>
                  <InputGroup size="sm">
                    <Input
                      pr="4.5rem"
                      type={showPassword ? 'text' : 'password'}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      placeholder="Enter password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.5rem" size="sm" onClick={handleShowPassword}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  bg="#2da44e"
                  color="white"
                  size="sm"
                  _hover={{ bg: '#2c974b' }}
                  _active={{ bg: '#298e46' }}
                  onClick={handleLoginSubmit}
                >
                  Log in
                </Button>
              </Stack>
            </ModalBody>
          </Card>
          <Box mt="10px">
            <Center>
              <HStack fontSize="sm" spacing="1">
                <Text>New to OnlyMaps?</Text>
                <Signup />
              </HStack>
            </Center>
          </Box>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
