import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { feedback } from '../api/feedback.api';
import imgUrl from '../assets/logo_example.png';
import { LiaCommentSolid } from 'react-icons/lia';
// import { StarIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Stack,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

function Feedback() {
  const [userCategory, setUserCategory] = useState(null);
  const [userRating, setUserRating] = useState(0);
  // const [hover, setHover] = useState(null);
  const [userFeedback, setUserFeedback] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const feedbackSucessToast = () => {
    toast({
      title: 'Your feedback has been submitted.',
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
    const feedbackData = {
      category: userCategory,
      rating: userRating,
      feedback: userFeedback,
      email: userEmail,
    };
    try {
      await feedback(feedbackData);
      feedbackSucessToast();
      navigate('/');
      handleCloseModal();
      setUserCategory(null);
      setUserRating(0);
      setUserFeedback('');
      setUserEmail('');
    } catch (error) {
      setError(error.response.data.message);
      feedbackErrorToast(error.response.data.message);
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <Tooltip label="Feedback" fontSize="md">
        <span>
          <IconButton
            bg="#222"
            color="white"
            colorScheme="black"
            size="sm"
            aria-label="Feedback"
            as={LiaCommentSolid}
            onClick={() => {
              onOpen();
            }}
          />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" mx="10px">
            <ModalBody>
              <Stack>
                <FormControl isRequired mb="10px">
                  <FormLabel size="sm">
                    As a user of this data, how would you categorize yourself?
                  </FormLabel>
                  <RadioGroup onChange={setUserCategory} value={userCategory}>
                    <VStack alignItems="flex-start">
                      <Radio bg="white" value="General Public">
                        General Public
                      </Radio>
                      <Radio bg="white" value="Academia">
                        Academia
                      </Radio>
                      <Radio bg="white" value="Industry">
                        Industry
                      </Radio>
                      <Radio bg="white" value="Governement">
                        Government
                      </Radio>
                      <Radio bg="white" value="Other">
                        Other
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>

                <FormControl isRequired mb="10px">
                  <FormLabel size="sm">
                    On a scale of 1 to 5, how was your experience accessing the
                    data?
                  </FormLabel>
                  <RadioGroup onChange={setUserRating} value={userRating}>
                    <HStack>
                      <Radio bg="white" value="1">
                        1
                      </Radio>
                      <Radio bg="white" value="2">
                        2
                      </Radio>
                      <Radio bg="white" value="3">
                        3
                      </Radio>
                      <Radio bg="white" value="4">
                        4
                      </Radio>
                      <Radio bg="white" value="5">
                        5
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>

                <FormControl mb="10px">
                  <FormLabel size="sm">
                    Explain your rating or share additional comments (max. 1500
                    characters).
                  </FormLabel>
                  <Textarea
                    bg="white"
                    maxLength="1500"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    placeholder="Enter text here"
                    value={userFeedback}
                    onChange={e => setUserFeedback(e.target.value)}
                  />
                </FormControl>

                <FormControl mb="10px">
                  <FormLabel size="sm">
                    If you provide an email address, we will endeavor to respond
                    to any specific issues reported.
                  </FormLabel>
                  <InputGroup size="sm">
                    <InputLeftAddon>Email (optional)</InputLeftAddon>
                    <Input
                      type="email"
                      bg="white"
                      borderColor="#d8dee4"
                      borderRadius="6px"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                    />
                  </InputGroup>
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
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Feedback;
