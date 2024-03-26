import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import imgUrl from '../assets/logo_example.png';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import Logout from './Logout';
import Login from './Login';
import Feedback from './Feedback';
import ShoppingCart from './ShoppingCart';
import About from './About';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  // Define breakpoints for responsive design heading size
  const headingFontSize = useBreakpointValue({
    base: '20px',
    md: '30px',
    lg: '40px',
  });

  const logoSize = useBreakpointValue({
    base: '30px',
    md: '35px',
    lg: '40px',
  });

  const iconSpacing = useBreakpointValue({
    base: '10px',
    md: '20px',
    lg: '40px',
  });

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      bg="#222"
      px="20px"
      py="16px"
      flexWrap="wrap"
    >
      <HStack spacing="10px">
        <NavLink to="/" onClick={reloadPage}>
          <Box w={logoSize} h={logoSize}>
            <Image src={imgUrl} alt="logo"></Image>
          </Box>
        </NavLink>
        <NavLink to="/" onClick={reloadPage}>
          <Heading as="h1" color="white" fontSize={headingFontSize}>
            OnlyMaps
          </Heading>
        </NavLink>
      </HStack>
      <Spacer />
      <HStack spacing={iconSpacing}>
        {isLoggedIn && <ShoppingCart />}
        {isLoggedIn && <Feedback />}
        <About />
        {isLoggedIn && <Logout />}
        {!isLoggedIn && <Login />}
      </HStack>
    </Flex>
  );
}

export default Navbar;
