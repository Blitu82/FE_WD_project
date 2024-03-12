import Signup from './Signup';
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
  IconButton,
  Image,
  Input,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

// From https://chakra-ui.com/docs/components/modal/usage

function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const toast = useToast();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

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

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { email, password };
    try {
      // login responds with the jwt token
      const response = await login(user);
      // console.log(response.data.authToken);
      storeToken(response.data.authToken);
      authenticateUser();
      loginSucessToast();
      navigate('/');
    } catch (error) {
      setError(error.response.data.message);
      // console.log('Error login', error);
      loginErrorToast(error.response.data.message); // this error message is coming from the backend
      setEmail('');
      setPassword('');
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

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
        Login
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
          <Card
            bg="#f6f8fa"
            variant="outline"
            borderColor="#d8dee4"
            // maW="308px"
            mx="10px"
          >
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
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <HStack justifyContent="space-between">
                    <FormLabel size="sm">Password</FormLabel>
                    <Button
                      as="a"
                      href="#"
                      variant="link"
                      size="xs"
                      color="#0969da"
                      fontWeight="500"
                    >
                      Forgot password?
                    </Button>
                  </HStack>
                  <Input
                    type="password"
                    bg="white"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  bg="#2da44e"
                  color="white"
                  size="sm"
                  _hover={{ bg: '#2c974b' }}
                  _active={{ bg: '#298e46' }}
                  onClick={handleSubmit}
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
                <Signup onClick={onClose} />
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
