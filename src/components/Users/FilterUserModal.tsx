import React from 'react';
import ModalContainer from '../ModalContainer';

interface FilterUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterUserModal: React.FC<FilterUserModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <ModalContainer
      title="Filter User"
      isOpen={isOpen}
      onClose={onClose}
      position="right"
    >
      Hello World
    </ModalContainer>
  );
};

export default FilterUserModal;
