import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import imgUrl from '../assets/logo_example.png';
import { NavLink } from 'react-router-dom';
import { Flex, HStack, Heading, Image, Spacer } from '@chakra-ui/react';
import Logout from './Logout';
import Login from './Login';
import Feedback from './Feedback';
import ShoppingCart from './ShoppingCart';
import About from './About';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
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
    >
      <HStack spacing="10px">
        <NavLink to="/" onClick={reloadPage}>
          <Image
            boxSize={['25px', '30px', '40px']}
            src={imgUrl}
            alt="logo"
          ></Image>
        </NavLink>
        <NavLink to="/" onClick={reloadPage}>
          <Heading as="h1" color="white">
            OnlyMaps
          </Heading>
        </NavLink>
      </HStack>
      <Spacer />
      <HStack spacing="40px">
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
