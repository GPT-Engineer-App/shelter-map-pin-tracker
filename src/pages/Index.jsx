import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const SHELTERS = [
  { name: "Shelter 1", lat: 40.7128, lng: -74.006 },
  { name: "Shelter 2", lat: 40.7348, lng: -73.9653 },
  { name: "Shelter 3", lat: 40.7488, lng: -73.9857 },
];

const Index = () => {
  const [pins, setPins] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ lat: "", lng: "", details: "" });
  const toast = useToast();

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setFormData({ lat, lng, details: "" });
    onOpen();
  };

  const handleSubmit = () => {
    setPins([...pins, formData]);
    onClose();
    toast({
      title: "Pin added",
      description: "The pin has been added to the map.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // TODO: Send formData to public services
  };

  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" my={8}>
        NYC Homeless Shelters Map
      </Heading>
      <Box h="500px" pos="relative">
        {/* TODO: Replace with actual map component */}
        <Box as="img" src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMG1hcHxlbnwwfHx8fDE3MTI4MDczNDB8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="NYC Map" objectFit="cover" w="100%" h="100%" onClick={handleMapClick} />
        {SHELTERS.map((shelter, index) => (
          <Box key={index} pos="absolute" top={`${shelter.lat}%`} left={`${shelter.lng}%`} transform="translate(-50%, -50%)" color="blue.500" fontSize="2xl">
            <FaMapMarkerAlt />
          </Box>
        ))}
        {pins.map((pin, index) => (
          <Box key={index} pos="absolute" top={`${pin.lat}%`} left={`${pin.lng}%`} transform="translate(-50%, -50%)" color="red.500" fontSize="2xl">
            <FaMapMarkerAlt />
          </Box>
        ))}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Latitude</FormLabel>
              <Input value={formData.lat} isReadOnly />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Longitude</FormLabel>
              <Input value={formData.lng} isReadOnly />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Details</FormLabel>
              <Textarea value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
