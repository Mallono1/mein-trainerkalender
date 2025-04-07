import React from 'react';
import ModalContainer from '../ModalContainer';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ArchiveUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: {
    id: string;
    fullName: string;
  } | null;
}

const ArchiveUserModal: React.FC<ArchiveUserModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  user,
}) => {
  return (
    <ModalContainer title=" " isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className=" text-center space-y-4"
      >
        <div className="flex justify-center">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        <p className="text-gray-800 text-lg font-semibold">Archive User</p>
        <p className="w-[25rem] text-gray-600 text-base">
          You’re about to archive{' '}
          <span className="font-semibold text-red-600">{user?.fullName}</span>.
          This action is irreversible. Are you sure?
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-32 cursor-pointer"
          >
            No, Keep it.
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="w-32 cursor-pointer"
          >
            Yes, Archive!
          </Button>
        </div>
      </motion.div>
    </ModalContainer>
  );
};

export default ArchiveUserModal;
