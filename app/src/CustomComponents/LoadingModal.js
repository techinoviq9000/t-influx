import { Modal, Spinner, Text } from "native-base";
import React, { useState } from "react";

const LoadingModal = ({showModal, message}) => {
  return (
    <Modal isOpen={showModal} size="xs">
      <Modal.Content>
        <Modal.Body p="5">
            <Spinner size="lg" color="emerald.400" />
            <Text textAlign="center" mt="2" fontSize="xs">{message}</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default LoadingModal;
