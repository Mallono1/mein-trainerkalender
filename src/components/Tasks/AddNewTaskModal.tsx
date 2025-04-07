import React from 'react';
import ModalContainer from '../ModalContainer';

interface AddNewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewTaskModal: React.FC<AddNewTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <ModalContainer
      title="Add New Task"
      isOpen={isOpen}
      onClose={onClose}
      position="center"
    >
      Test new task
    </ModalContainer>
  );
};

export default AddNewTaskModal;
