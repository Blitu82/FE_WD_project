import React from 'react';
import {
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';
import { GrSelect } from 'react-icons/gr';

function QuickTips() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onToggle}
        onClose={onClose}
        placement="bottom"
      >
        <PopoverTrigger>
          <Tooltip label="Quick Tips" fontSize="md" placement="left">
            <IconButton
              ref={btnRef}
              colorScheme="blue"
              onClick={onToggle}
              position="absolute"
              bottom="95px"
              right="20px"
              icon={<QuestionIcon />}
            ></IconButton>
          </Tooltip>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Quick Tips</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              {/* <HStack as="header" justifyContent="center" m="8" spacing="5">
                <Icon as={LiaCommentSolid} boxSize="36px"></Icon>
                <Text as="h1" fontSize="24px">
                  User Feedback
                </Text>
              </HStack> */}
              <HStack>
                <Icon as={GrSelect} boxSize="20px" />
                <Text as="b">Selection</Text>
              </HStack>
              <Text> Click to select a single feature.</Text>

              <Text>Ctrl + Click to select multiple features.</Text>
            </PopoverBody>
            <PopoverFooter></PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>

      {/* <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay h="auto" />
        <DrawerContent
          containerProps={{
            top: '95px',
            left: '20px',
            // height: `${drawerContentHeight}px`,
            maxHeight: '100vh',
            overflowY: 'auto',
          }}
          style={{ position: 'absolute' }}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <Icon as={IoLayers} />
              <Text fontSize="xxl">Quick Tips</Text>
            </HStack>
          </DrawerHeader>
          <Divider />

          <DrawerBody>
            <VStack align="stretch">
              <>
                <Button
                  colorScheme="blue"
                  onClick={addToCart}
                  leftIcon={<Icon as={PiShoppingCartSimpleFill} />}
                  rounded="none"
                >
                  Add to cart
                </Button>
                <Checkbox defaultChecked>Select all / none</Checkbox>
                <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4">
                  <CardBody width="100%">
                    {selectedTiles.map(tile => (
                      <Box key={tile.id} h="auto">
                        <VStack alignItems="left">
                          <HStack marginBottom="10px">
                            <Checkbox defaultChecked isChecked={tile.selected}>
                              <Text>{tile.name}</Text>
                            </Checkbox>
                            <Spacer />
                            <Tooltip label="Zoom to feature" fontSize="sm">
                              <IconButton
                                colorScheme="blue"
                                icon={<Search2Icon />}
                                size="sm"
                              ></IconButton>
                            </Tooltip>
                            <Tooltip label="Remove from list" fontSize="sm">
                              <IconButton
                                colorScheme="blue"
                                icon={<CloseIcon />}
                                size="sm"
                              ></IconButton>
                            </Tooltip>
                          </HStack>
                        </VStack>
                      </Box>
                    ))}
                  </CardBody>
                  <CardFooter></CardFooter>
                </Card>
              </>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}
    </>
  );
}

export default QuickTips;
