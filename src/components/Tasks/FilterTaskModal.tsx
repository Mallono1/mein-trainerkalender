import React from 'react';
import ModalContainer from '../ModalContainer';

interface FilterTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterTaskModal: React.FC<FilterTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <ModalContainer
      title="Filter Task"
      isOpen={isOpen}
      onClose={onClose}
      position="right"
    >
      Filter me
    </ModalContainer>
  );
};

export default FilterTaskModal;
