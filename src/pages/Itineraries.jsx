import {
  Box,
  Stack,
  Text,
  IconButton,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Overlay from '../components/Overlay';

function Itineraries({
  geoJson,
  activity,
  postActivity,
  deleteActivity,
  deleteLocation,
}) {
  // Define constant that will be used to toggle between light/dark mode
  const bgColor = useColorModeValue('gray.100', 'whiteAlpha.50');

  // Define function that returns the activities associated with each location
  const getLocationActivities = locationId => {
    return activity
      ? activity.filter(act => act.itineraryId === locationId)
      : [];
  };

  return (
    <Box p="10px" h="100%">
      {geoJson && (
        <Stack spacing="15px">
          {geoJson.features.map(location => (
            <Stack
              key={location.properties.id}
              direction="row"
              bg={bgColor}
              borderWidth="1px"
              borderRadius="lg"
              p="10px"
              spacing="20px"
              shadow="md"
              alignItems="center"
              minW={0}
              overflowX="auto"
            >
              <Box flex="1">
                <Text as="strong" textAlign="left">
                  {location.properties.name}
                </Text>
                {activity && (
                  <Stack
                    direction={{ base: 'column-reverse', md: 'row' }}
                    pt="5px"
                    maxW="300px"
                    minW={0}
                    overflowX="auto"
                  >
                    {getLocationActivities(location.properties.id).map(act => (
                      <Badge key={act.id} variant="solid" colorScheme="green">
                        {`#${act.title}`}
                      </Badge>
                    ))}
                  </Stack>
                )}
              </Box>
              <Box flex="none">
                <Stack direction="row" spacing="4">
                  <Overlay
                    location={location}
                    locationActivities={getLocationActivities(
                      location.properties.id
                    )}
                    postActivity={postActivity}
                    deleteActivity={deleteActivity}
                  />
                  <IconButton
                    aria-label="Delete Icon"
                    colorScheme="yellow"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={() => {
                      deleteLocation(location.properties.id);
                    }}
                  />
                </Stack>
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default Itineraries;
