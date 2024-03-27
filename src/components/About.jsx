import { RiInformationFill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BiShare } from 'react-icons/bi';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import avatarUrl from '../assets/pga.png';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

function About() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="About" fontSize="md" gutter="22">
        <span>
          <IconButton
            bg="#222"
            color="white"
            colorScheme="black"
            size="sm"
            aria-label="Feedback"
            as={RiInformationFill}
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
            <Icon as={RiInformationFill} boxSize="36px"></Icon>
            <Text as="h1" fontSize="24px">
              About
            </Text>
          </HStack>

          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" mx="10px">
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Link href="https://www.linkedin.com/in/garpablo/">
                    <Avatar name="Pablo García" src={avatarUrl} />
                  </Link>
                  <Box>
                    <Heading size="sm">Pablo García</Heading>
                    <Text>Web Developer, Hydrographic Surveyor</Text>
                  </Box>
                </Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="LinkedIn page"
                  icon={<BsThreeDotsVertical />}
                />
              </Flex>
            </CardHeader>
            <ModalBody>
              <Stack>
                <FormControl mb="10px">
                  <FormLabel size="sm">About this data:</FormLabel>
                  <Text borderColor="#d8dee4" size="sm" borderRadius="6px">
                    OnlyMaps is a mapping server app developed as the final
                    project for my Ironhack Web Development course. The app
                    contains a collection of GEBCO datasets to facilitate the
                    download of large amounts of high resolution bathymetry
                    data. For more information regarding these products, please
                    refer to the GEBCO Data Portal:
                    <br />
                    <br />
                    <Text>
                      <Link
                        color="teal.500"
                        href="https://www.gebco.net/data_and_products/gridded_bathymetry_data/"
                        isExternal
                      >
                        <strong>GEBCO portal</strong>{' '}
                        <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Text>
                    <br />
                    <Text>
                      The OnlyMaps database was last updated: March, 2024.
                    </Text>
                  </Text>
                </FormControl>
              </Stack>
            </ModalBody>
            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
              <Link flex="1" isExternal href="https://github.com/Blitu82">
                <Button variant="ghost" leftIcon={<FaGithub />}>
                  GitHub
                </Button>
              </Link>
              <Link
                flex="1"
                isExternal
                href="https://www.linkedin.com/in/garpablo/"
              >
                <Button variant="ghost" leftIcon={<FaLinkedin />}>
                  LinkedIn
                </Button>
              </Link>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>
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

export default About;
