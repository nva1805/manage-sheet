import { useState } from 'react';

interface UseModalHook {
  isOpenModal: boolean
  handleToggleModal: () => void
}

const useModal = (initialValue = false): UseModalHook => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(initialValue);

  const handleToggleModal = (): void => {
    setIsOpenModal(!isOpenModal);
  };
  return {
    isOpenModal,
    handleToggleModal
  };
};

export default useModal;
