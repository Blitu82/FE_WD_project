import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { login } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import imgUrl from '../assets/logo_example.png';
import { LiaCommentSolid } from 'react-icons/lia';
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
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

// From https://chakra-ui.com/docs/components/modal/usage

function Feedback() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const toast = useToast();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const feedbackSucessToast = () => {
    toast({
      title: 'You are successfully submitted your feedback.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const feedbackErrorToast = errorMessage => {
    toast({
      title: 'Feedback Error',
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
      feedbackSucessToast();
      navigate('/');
    } catch (error) {
      setError(error.response.data.message);
      // console.log('Error login', error);
      feedbackErrorToast(error.response.data.message); // this error message is coming from the backend
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
      <Tooltip label="Feedback" fontSize="md">
        <span>
          <IconButton
            bg="#222"
            color="white"
            size="sm"
            aria-label="Feedback"
            colorScheme="black"
            as={LiaCommentSolid}
            onClick={() => {
              onOpen();
            }}
          />
        </span>
      </Tooltip>
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
              User Feedback
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
                  <FormLabel size="sm">Question 1</FormLabel>
                  <Input
                    type="email"
                    bg="white"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    // placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel size="sm">Question 2</FormLabel>
                  <Input
                    type="password"
                    bg="white"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    // placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel size="sm">Question 3</FormLabel>
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
                <FormControl>
                  <FormLabel size="sm">Question 4</FormLabel>
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
                <FormControl>
                  <FormLabel size="sm">Question 5</FormLabel>
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
                  Submit
                </Button>
              </Stack>
            </ModalBody>
          </Card>

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

export default Feedback;
