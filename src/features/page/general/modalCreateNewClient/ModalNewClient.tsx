import React, { useState } from 'react';
import { Modal as AntModal, Button, Input } from 'antd';
import { createNewClient } from '../../../../service/apiService';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { FaTimesCircle } from 'react-icons/fa';
import { updateCustomerListAction } from '../../../../redux/action/customerAction/action';
import { updatePrjCustomerAction } from '../../../../redux/action/generalAction/action';

interface IModalNewClient {
  isOpenModal: boolean
  onSummit?: () => void
  onCloseModal: () => void
}
const ModalNewClient = ({ isOpenModal, onCloseModal }: IModalNewClient): JSX.Element => {
  const [formValue, setFormValue] = useState({ name: '', code: '', address: '' });

  const dispatch = useDispatch();

  const handleInputCreClientChange = (e: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validateForm = (formValue: { name: string, code: string, address: string }): boolean => {
    if (formValue.name.trim().length === 0 && formValue.code.trim().length === 0) {
      toast.error('Invalid value');
      return false;
    }
    if (formValue.name.trim().length === 0) {
      toast.error('Please enter customer name!');
      return false;
    }
    if (formValue.code.trim().length === 0) {
      toast.error('Please enter customer code!');
      return false;
    }
    return true;
  };

  const handleCreateNewClient = async (): Promise<void> => {
    const validate = validateForm(formValue);
    if (!validate) {
      return;
    }
    try {
      const res = await createNewClient(formValue);
      console.log(res);
      if (res.status === 200) {
        toast.success('Create new client success');
        const { id, name } = res.data.result;
        dispatch(updateCustomerListAction({ name, id }));
        dispatch(updatePrjCustomerAction(res?.data?.result?.id));
        onCloseModal();
      }
    } catch (error) {
      const errorMessage = isAxiosError(error)
        ? error.response?.data?.error.message
        : 'Create new client fail';
      toast.error(errorMessage);
    }
  };
  return (
    <div>
      <AntModal
        title="New Client"
        closeIcon={<FaTimesCircle className='w-5 h-5'/>}
        open={isOpenModal}
        onCancel={onCloseModal}
        footer={[
          <Button key="close" onClick={onCloseModal}>
            Cancel
          </Button>,
          <Button key="submit" className='bg-green-550' type="primary" onClick={handleCreateNewClient as () => void}>
            Save
          </Button>
        ]}
      >
        <hr />
        <div className='mt-5 flex flex-col flex-wrap gap-5'>
          <Input
            placeholder='Name *'
            name='name'
            size='large'
            onChange={(e) => handleInputCreClientChange(e)}
          />
          <Input
            placeholder='Code *'
            name='code'
            size='large'
            onChange={(e) => handleInputCreClientChange(e)}
          />
          <Input.TextArea
            rows={2}
            name='address'
            size='large'
            placeholder='Address'
            onChange={(e) => handleInputCreClientChange(e)}
          />
        </div>
      </AntModal>
    </div>
  );
};

export default ModalNewClient;
