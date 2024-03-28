import { Box, Text, Divider, VStack } from '@chakra-ui/react';

function CoordinateBox({ coordinates }) {
  const { lat, lng } = coordinates;
  if (lat === undefined || lng === undefined) {
    return null;
  }
  return (
    <Box
      position="absolute"
      top="95px"
      right="100px"
      bg="white"
      p="10px"
      borderRadius="10px"
      boxShadow="lg"
      opacity="0.6"
    >
      <VStack align="left">
        <Text fontSize="xs">
          <b>{`Lat: ${lat?.toFixed(3)}°`}</b>
        </Text>
        <Divider borderColor="black" borderWidth="0.5px" />
        <Text fontSize="xs">
          <b>{`Lng: ${lng?.toFixed(3)}°`}</b>
        </Text>
      </VStack>
    </Box>
  );
}

export default CoordinateBox;
