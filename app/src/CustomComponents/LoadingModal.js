import { Modal, Spinner, Text } from "native-base";
import React, { useState } from "react";

const LoadingModal = ({showModal}) => {
  return (
    <Modal isOpen={showModal} size="xs">
      <Modal.Content>
        <Modal.Body p="5">
            <Spinner size="lg" color="emerald.500" />
            <Text textAlign="center" mt="2" fontSize="xs">Saving information. Please wait.</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default LoadingModal;
