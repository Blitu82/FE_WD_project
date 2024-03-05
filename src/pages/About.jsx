import {
  Box,
  Stack,
  Text,
  useColorModeValue,
  Divider,
  Link,
  Card,
  Flex,
  Avatar,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiChakraui, SiMapbox } from 'react-icons/si';

function About() {
  const bgColor = useColorModeValue('gray.100', 'whiteAlpha.50');
  const dividerColor = useColorModeValue('black.100', 'white');

  return (
    <Box m={3} w="auto">
      <Stack bg={bgColor} borderWidth="1px" borderRadius="lg" p="20px" h="100%">
        <Flex
          flex="1"
          flexDirection="column-reverse"
          gap="4"
          alignItems="center"
          justifyContent="space-between"
          pb="20px"
        >
          <Stack>
            <Text as="b" fontSize="3xl" p="5px">
              TrekTrackr
            </Text>
            <Divider borderWidth="2px" borderColor={dividerColor} />

            <Text fontSize="2xl" p="5px" pt="30px">
              Location planner app that allows users to manage itineraries when
              visiting new cities.
            </Text>
          </Stack>
          <Stack>
            <Flex flexDirection="row" gap="10" justify="center">
              <Card maxWidth="600px" p="10px">
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      size="2xl"
                      name="Estanislau Mendes"
                      src="https://media.licdn.com/dms/image/C5603AQHS8dOb3WusBg/profile-displayphoto-shrink_800_800/0/1635409428761?e=2147483647&v=beta&t=nZSJmNlDr-VHnpliq7NPRHuyhZ-wbWYzVQEKkm7qWaw"
                    />

                    <Box>
                      <Heading size="lg">Estanislau Mendes</Heading>
                      <Text>Web Developer</Text>
                    </Box>
                    <Flex flex="1" justify="flex-end" gap="4" pr="5px">
                      <Link href="https://www.linkedin.com/in/estanislau-mendes">
                        <FaLinkedin size="50px" />
                      </Link>
                      <Link href="https://github.com/estanislaumendes">
                        <FaGithub size="50px" />
                      </Link>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
              <Card maxWidth="600px" p="10px">
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      size="2xl"
                      name="Pablo Garcia"
                      src="https://media.licdn.com/dms/image/D4D03AQFjj8ruYe8YUA/profile-displayphoto-shrink_400_400/0/1683530598602?e=1710979200&v=beta&t=inYr-5y-tYRm0JbZMuIMEmf4VxSgXEqILU9hub7ArSU"
                    />

                    <Box>
                      <Heading size="lg">Pablo Garcia</Heading>
                      <Text>Web Developer</Text>
                    </Box>
                    <Flex flex="1" justify="flex-end" gap="4" pr="5px">
                      <Link href="https://www.linkedin.com/in/garpablo/">
                        <FaLinkedin size="50px" />
                      </Link>
                      <Link href="https://github.com/Blitu82">
                        <FaGithub size="50px" />
                      </Link>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </Flex>
          </Stack>
        </Flex>

        <Flex
          flex="1"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="stretch"
          justifyContent="space-evenly"
          h="100%"
        >
          <Stack>
            <Text as="b" fontSize="2xl" p="5px" pt="30px" textAlign="center">
              API'S
            </Text>
            <Divider bg={bgColor} borderWidth="1.5px" />
            <HStack direction="row" spacing={1} justify="center">
              <SiMapbox size="30px" />
              <Link
                fontSize="l"
                p="5px"
                href="https://docs.mapbox.com/"
                isExternal
              >
                Mapbox <ExternalLinkIcon mx="2px" />
              </Link>
            </HStack>
          </Stack>
          <Stack>
            <Text as="b" fontSize="2xl" p="5px" pt="30px" textAlign="center">
              External Library
            </Text>
            <Divider bg={bgColor} borderWidth="1.5px" />
            <HStack direction="row" spacing={1} justify="center">
              <SiChakraui size="30px" />
              <Link
                fontSize="l"
                p="5px"
                href="https://chakra-ui.com/"
                isExternal
              >
                Chakra UI <ExternalLinkIcon mx="2px" />
              </Link>
            </HStack>
          </Stack>
          <Stack>
            <Text as="b" fontSize="2xl" p="5px" pt="30px" textAlign="center">
              Github
            </Text>
            <Divider bg={bgColor} borderWidth="1.5px" />
            <HStack direction="row" spacing={1} justify="center">
              <FaGithub size="30px" />
              <Link
                fontSize="l"
                p="5px"
                href="https://github.com/Blitu82/TrekTrackr"
                isExternal
              >
                Frontend <ExternalLinkIcon mx="2px" />
              </Link>
            </HStack>
            <HStack direction="row" spacing={1} justify="center">
              <FaGithub size="30px" />
              <Link
                fontSize="l"
                p="5px"
                href="https://github.com/Blitu82/json-server-backend"
                isExternal
              >
                Backend <ExternalLinkIcon mx="2px" />
              </Link>
            </HStack>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}

export default About;
