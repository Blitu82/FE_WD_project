import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';
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
  VStack,
} from '@chakra-ui/react';

// From https://chakra-ui.com/docs/components/modal/usage

function Signup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  console.log(email);
  console.log(password);

  // const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { email, password };

    try {
      await signup(user);
      navigate('/');
    } catch (error) {
      console.log('Error signing up', error);
      setError(error.response.data.message);
    }
  };

  // From https://chakra-ui.com/docs/components/editable
  return (
    <>
      <Link
        // isExternal
        color="#0969da"
        // href="#"
        onClick={() => {
          onOpen();
        }}
      >
        Create an account.
      </Link>
      {/* <Button
        leftIcon={<ArrowForwardIcon />}
        colorScheme="yellow"
        variant="solid"
        onClick={() => {
          onOpen();
        }}
      >
        Login
      </Button> */}
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
            maW="308px"
            mx="10px"
          >
            <ModalBody>
              <Stack>
                <FormControl>
                  <FormLabel size="sm">Username or email address</FormLabel>
                  <Input
                    type="email"
                    bg="white"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
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
              </Stack>
            </ModalBody>
          </Card>
          <Box mt="10px">
            <Center>
              <HStack fontSize="sm" spacing="1"></HStack>
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
