import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../api/auth.api';
import imgUrl from '../assets/logo_example.png';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
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
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

function ResetPassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const navigate = useNavigate();

  const handleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const passwordSucessToast = () => {
    toast({
      title: 'You have successfully changed your password.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const passwordErrorToast = errorMessage => {
    toast({
      title: 'There was problem resetting the password.',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleChangePasswordSubmit = async e => {
    e.preventDefault();
    const user = { email, oldPassword, newPassword };
    try {
      await changePassword(user);
      passwordSucessToast();
      setEmail('');
      setOldPassword('');
      setNewPassword('');
      navigate('/');
      onClose();
    } catch (error) {
      setError(error.response.data.message);
      passwordErrorToast(error.response.data.message);
      setEmail('');
      setOldPassword('');
      setNewPassword('');
    }
  };

  return (
    <>
      <Button
        as="a"
        href="#"
        variant="link"
        size="xs"
        color="#0969da"
        fontWeight="500"
        onClick={() => {
          onOpen();
        }}
      >
        Reset password
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
              Reset password
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
                    <FormLabel size="sm">Current password</FormLabel>
                  </HStack>
                  <InputGroup size="sm">
                    <Input
                      pr="4.5rem"
                      type={showOldPassword ? 'text' : 'password'}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      placeholder="Enter current password"
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.5rem"
                        size="sm"
                        onClick={handleShowOldPassword}
                      >
                        {showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <HStack justifyContent="space-between">
                    <FormLabel size="sm">New password</FormLabel>
                  </HStack>
                  <InputGroup size="sm">
                    <Input
                      pr="4.5rem"
                      type={showNewPassword ? 'text' : 'password'}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.5rem"
                        size="sm"
                        onClick={handleShowNewPassword}
                      >
                        {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
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
                  onClick={handleChangePasswordSubmit}
                  boxShadow="lg"
                >
                  Reset password
                </Button>
                {error & <Text>{error}</Text>}
              </Stack>
            </ModalBody>
          </Card>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResetPassword;
