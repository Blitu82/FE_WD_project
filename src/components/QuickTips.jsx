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
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Kbd,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';
import { MdKeyboardCommandKey } from 'react-icons/md';
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
              bg="#004c80"
              boxShadow="lg"
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
            <PopoverHeader>
              <HStack>
                <QuestionIcon />
                <Text fontSize="xxl" as="b">
                  Quick Tips
                </Text>
              </HStack>
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <HStack alignItems="center">
                <Icon as={GrSelect} boxSize="20px" />
                <Text>Selection</Text>
                <br />
                <br />
              </HStack>
              <Text>
                <Kbd>Click</Kbd> to select a single feature.
              </Text>
              <Text>
                <Kbd>Ctrl</Kbd> +<Kbd>Click</Kbd> to select multiple features.
              </Text>
              <HStack alignItems="center" mt="5px">
                <Kbd>
                  <Icon as={MdKeyboardCommandKey} boxSize="15px" />
                </Kbd>
                <Text>
                  + <Kbd>Click</Kbd> to select multiple features.
                </Text>
              </HStack>
              <br />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}

export default QuickTips;
