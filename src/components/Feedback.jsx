import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { feedback } from '../api/feedback.api';
import { LiaCommentSolid } from 'react-icons/lia';
// import { StarIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

function Feedback() {
  const [userCategory, setUserCategory] = useState(null);
  const [userRating, setUserRating] = useState(0);
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

  const isValidEmail = email => {
    const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    return email === '' || emailRegex.test(email);
  };

  const handleFeedbackSubmit = async e => {
    e.preventDefault();
    if (userEmail && !isValidEmail(userEmail)) {
      setError('Please enter a valid email address.');
      feedbackErrorToast(error);
      return;
    }
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
      <Tooltip label="Feedback" fontSize="md" gutter="24">
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
          <HStack as="header" justifyContent="center" m="8" spacing="5">
            <Icon as={LiaCommentSolid} boxSize="36px"></Icon>
            <Text as="h1" fontSize="24px">
              User Feedback
            </Text>
          </HStack>
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
                  onClick={handleFeedbackSubmit}
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
