import { useState } from 'react';
import { DeleteIcon, EditIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Badge, IconButton } from '@chakra-ui/react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

// From https://chakra-ui.com/docs/components/modal/usage
function Overlay({
  location,
  locationActivities,
  postActivity,
  deleteActivity,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // STATE VARIABLES:
  // Define state variables to store the activity selected by the user in the form
  const [selectedActivity, setSelectedActivity] = useState('');

  // Define function that returns activity selected by the user and sets that activity to state.
  const handleActivityChange = event => {
    setSelectedActivity(event.target.value);
  };

  const handleAddActivity = () => {
    postActivity(location.properties.id, selectedActivity);
    onClose();
  };

  // From https://chakra-ui.com/docs/components/editable
  return (
    <>
      <IconButton
        aria-label="Edit Icon"
        icon={<EditIcon />}
        colorScheme="yellow"
        size="sm"
        onClick={() => {
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{location.properties.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Add Activity</FormLabel>
              <Select
                placeholder="Select an activity"
                mb="20px"
                value={selectedActivity}
                onChange={handleActivityChange}
              >
                <option>cultural</option>
                <option>sport</option>
                <option>culinary</option>
                <option>adventure</option>
                <option>historial tour</option>
                <option>nature walk</option>
                <option>shopping</option>
                <option>photography</option>
                <option>sightseeing</option>
                <option>boat tour</option>
                <option>music concert</option>
                <option>local festivals</option>
                <option>museum visit</option>
                <option>outdoor picnic</option>
                <option>wine tasting</option>
                <option>art gallery visit</option>
                <option>yoga session</option>
                <option>cycling tour</option>
                <option>cooking class</option>
                <option>gardening workshop</option>
              </Select>
            </FormControl>
            {locationActivities.map(act => (
              <Badge variant="solid" colorScheme="green" key={act.id} m="5px">
                {`#${act.title}`}
                <IconButton
                  aria-label="Close Icon"
                  icon={<DeleteIcon />}
                  size="sm"
                  m="5px"
                  onClick={() => deleteActivity(act.id)}
                />
              </Badge>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleAddActivity}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Overlay;
