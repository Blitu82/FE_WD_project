import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import imgUrl from '../assets/logo_example.png';
import Logout from './Logout';
import Login from './Login';
import Feedback from './Feedback';
import ShoppingCart from './ShoppingCart';
import About from './About';
import { NavLink } from 'react-router-dom';
import { Flex, HStack, Heading, Image, Spacer } from '@chakra-ui/react';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  const reloadPage = () => {
    window.location.reload(); // or window.location.href = window.location.href;
  };
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex as="nav" alignItems="center" bg="#222" px="20px" py="16px">
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
