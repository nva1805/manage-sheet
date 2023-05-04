import { Button, Modal } from 'antd';
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

interface ConfirmModalProps {
  summitText: string
  contentText: string
  isOpenConfirmModal: boolean
  toggleConfirmModal: () => void
  onConfirm: () => void
}
const ConfirmModal = (props: ConfirmModalProps): JSX.Element => {
  const
    {
      summitText,
      isOpenConfirmModal,
      toggleConfirmModal,
      onConfirm,
      contentText
    } = props;

  return (
    <div>
      <Modal
        closeIcon={<FaTimesCircle className='w-5 h-5'/>}
        title="Warning !!!"
        open={isOpenConfirmModal}
        onCancel={toggleConfirmModal}
        footer={[
          <Button
            key='cancel'
            onClick={toggleConfirmModal}
            className='bg-green-400 text-white hover:bg-white border
             hover:text-black hover:border-black duration-300 transition-all'
          >
            Cancel
          </Button>,
          <Button
            key='ok'
            onClick={onConfirm}
            className='bg-green-550 text-white border hover:bg-white
             hover:text-black hover:border-black duration-300 transition-all'
          >
            {summitText}
          </Button>
        ]}
      >
        <p>{contentText}</p>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
