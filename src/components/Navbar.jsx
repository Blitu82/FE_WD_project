import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import imgUrl from '../assets/logo_example.png';
import Logout from './Logout';
import Login from './Login';
import { NavLink } from 'react-router-dom';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LiaCommentSolid } from 'react-icons/lia';
import { MdLogin, MdLogout } from 'react-icons/md';
import { RiInformationLine } from 'react-icons/ri';
import { MoonIcon, SunIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

function Navbar() {
  // const { toggleColorMode } = useColorMode();
  const { isLoggedIn, user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex as="nav" alignItems="center" bg="#222" px="20px" py="16px">
      <HStack spacing="10px">
        <NavLink to="/">
          <Image
            boxSize={['25px', '30px', '40px']}
            src={imgUrl}
            alt="logo"
          ></Image>
        </NavLink>
        <NavLink to="/">
          <Heading as="h1" color="white">
            OnlyMaps
          </Heading>
        </NavLink>
      </HStack>
      <Spacer />
      <HStack spacing="40px">
        <Tooltip label="Shopping cart" fontSize="md">
          <span>
            <IconButton
              bg="#222"
              // color="white"
              colorScheme="black"
              size="sm"
              aria-label="Shopping Cart"
              as={PiShoppingCartSimpleFill}
            />
          </span>
        </Tooltip>
        <Tooltip label="Feedback" fontSize="md">
          <span>
            <IconButton
              bg="#222"
              color="white"
              size="sm"
              aria-label="Feedback"
              colorScheme="black"
              as={LiaCommentSolid}
            />
          </span>
        </Tooltip>
        {/* <Menu isOpen={isOpen}>
          <MenuButton
            bg="#222"
            color="white"
            icon={IconButton}
            as={GiHamburgerMenu}
            aria-label="Options"
            colorScheme="black"
            variant="ghost"
            mx={1}
            py={[1, 2, 2]}
            px={4}
            borderRadius={5}
            // _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            fontWeight="normal"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          />
          <MenuList
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            bg="#222"
            color="white"
          >
            <MenuItem as={RiInformationLine}>About</MenuItem>
            <MenuItem as={MdLogout}>Log out</MenuItem>
          </MenuList>
        </Menu> */}
        {isLoggedIn && <Logout />}
        {!isLoggedIn && <Login />}
      </HStack>
    </Flex>
  );
}

export default Navbar;
