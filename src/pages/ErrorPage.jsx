import { Image, Box, Text, Button } from '@chakra-ui/react';
import errorImgUrl from '../assets/error-page-not-found-404.gif';
import { NavLink } from 'react-router-dom';

function ErrorPage() {
  return (
    <Box m="3" textAlign="center">
      <Image ml="auto" mr="auto" src={errorImgUrl} alt="404 error page" />
      <Text as="b" fontSize="3xl" p="5px">
        Back to the main page you must{' '}
        <Button
          colorScheme="yellow"
          fontWeight="bold"
          fontSize="30px"
          size="md"
          pb="8px"
        >
          <NavLink to="/" size="xl">
            go
          </NavLink>
        </Button>
      </Text>
    </Box>
  );
}

export default ErrorPage;
