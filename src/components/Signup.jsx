import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';
import imgUrl from '../assets/logo_example.png';
import { AuthContext } from '../context/auth.context';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Login from './Login';
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

function Signup(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const toast = useToast();

  const navigate = useNavigate();

  const signupSucessToast = () => {
    toast({
      title: 'You have successfully signed up.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const signupErrorToast = errorMessage => {
    toast({
      title: 'Signup Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Create an object representing the request body
    const user = { email, password };
    try {
      await signup(user);
      signupSucessToast();
      setEmail('');
      setPassword('');
      navigate('/');
      onClose();
    } catch (error) {
      console.log('Error signing up', error);
      setError(error.response.data.message);
      signupErrorToast(error.response.data.message);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <Link
        color="#0969da"
        href="#"
        onClick={() => {
          onOpen();
        }}
      >
        Create an account
      </Link>
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
              Signup to OnlyMaps
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
                  Signup
                </Button>
                {error & <Text>{error}</Text>}
              </Stack>
            </ModalBody>
          </Card>
          <Box mt="10px">
            <Center>
              <HStack fontSize="sm" spacing="1">
                {/* <Link isExternal color="#0969da" href="#">
                  I have an account.
                </Link> */}
                <Text color="white">New to OnlyMaps?</Text>
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

export default Signup;
