import React, { useEffect, memo } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from '../../../components/DatePicker/DatePicker';
import { EProjectTypes } from '../../../constants/constants';
import dayjs from 'dayjs';
import ModalNewClient from './modalCreateNewClient/ModalNewClient';
import useModal from '../../../hooks/useModal';
import { IGeneralState } from '../../../interface/interface';
import * as Action from '../../../redux/action/generalAction/action';
import { getAllCustomer } from '../../../service/apiService';
import { sendCustomerListAction } from '../../../redux/action/customerAction/action';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const General = (): JSX.Element => {
  const { customerList } = useSelector((state: IGeneralState) => state.customerReducer);
  const { isOpenModal, handleToggleModal } = useModal(false);
  const {
    allUser,
    note,
    projectCode,
    projectCustomer,
    projectName,
    projectType,
    timeStart,
    timeEnd
  } = useSelector((state: IGeneralState) => state.generalReducer);
  const { isEdit, projectInfo } = useSelector((state: IGeneralState) => state.projectReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && location.pathname.includes('edit')) {
      dispatch(Action.updateGeneralFormAction(projectInfo));
    }
  }, [isEdit]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await getAllCustomer();
        dispatch(sendCustomerListAction(res.data.result));
      } catch (error) {
        const errorMessage = isAxiosError(error);
        toast.error(errorMessage);
      }
    };
    void fetchData();
  }, []);

  const initialValues =
  {
    projectCustomer: isEdit ? projectInfo.customerId : null,
    projectName: isEdit ? projectInfo.name : '',
    projectCode: isEdit ? projectInfo.code : '',
    timeStart: isEdit ? projectInfo.timeStart : '',
    timeEnd: isEdit ? projectInfo.timeEnd : '',
    note: isEdit ? projectInfo.note : '',
    allUser: isEdit ? projectInfo.isAllUserBelongTo : false,
    projectType: isEdit ? projectInfo.projectType : projectType
  };

  const validationSchema = Yup.object({
    projectCustomer: Yup.string()
      .trim()
      .required('Project customer is required!'),
    projectName: Yup.string()
      .trim()
      .max(64, 'Max length is 64 character')
      .required('Project name is required!'),
    projectCode: Yup.string()
      .trim()
      .max(64, 'Max length is 64 character')
      .required('Project code is required!'),
    timeStart: Yup.string()
      .trim()
      .required('Start Date is required')
  });

  const optionSelect: Array<{ value: number, label: string }> = customerList.map(customer =>
    ({ value: customer.id, label: customer.name }));
  return (
    <div className='my-5'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={values => {
        }}
      >
        {({ errors, touched, values, handleBlur, setValues, handleSubmit, setFieldValue, setFieldTouched }) => {
          console.log(values.projectType);
          console.log(projectInfo.projectType);

          return (
            <Form onSubmit={handleSubmit} className='flex flex-col gap-10'>
              <div className='flex justify-start gap-0 md:gap-5 lg:gap-16 items-center flex-wrap'>
                <label className='block w-32 font-bold' htmlFor=''>Client <span className='text-red-500 text-xl'> *</span></label>
                <div className='relative'>
                  <Select
                    showSearch
                    id="projectCustomer"
                    size='large'
                    style={{ width: 550 }}
                    placeholder='Search to Select'
                    optionFilterProp='children'
                    onChange={(value: number) => {
                      setFieldValue('projectCustomer', value);
                      dispatch(Action.updatePrjCustomerAction(value));
                    }}
                    value={projectCustomer}
                    onBlur={value => {
                      setFieldTouched('projectCustomer');
                    }}
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={optionSelect}
                  />
                  {
                    (errors.projectCustomer != null) && (touched.projectCustomer === true)
                      ? <p className='absolute -bottom-9 text-red-500 text-sm font-bold'>{errors.projectCustomer}</p>
                      : null
                  }
                </div>
                <button
                  className='md:p-2 p-1 mt-5 md:mt-0 bg-green-550 border text-white
                   border-green-550 hover:bg-white hover:text-black hover:border-blue-600
                   transition-all duration-500 rounded font-bold text-base'
                  onClick={handleToggleModal}
                  type='button'
                >
                  + New Client
                </button>
                {isOpenModal && <ModalNewClient isOpenModal={isOpenModal} onCloseModal={handleToggleModal} />}
              </div>

              <div className='flex justify-start gap-5 lg:gap-16 items-center flex-wrap'>
                <label className='block w-32 font-bold' htmlFor=''>
                  Project Name
                  <span className='text-red-500 text-xl'> *</span>
                </label>
                <div className='relative'>
                  <Input
                    size='large'
                    placeholder='Project name...'
                    className='w-80 lg:w-550px p-3 border'
                    value={projectName}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue('projectName', e.target.value);
                      dispatch(Action.updatePrjNameAction(e.target.value));
                    }}
                    name='projectName'
                  />
                  {
                    (errors.projectName != null) && (touched.projectName === true)
                      ? <p className='absolute -bottom-9 text-red-500 text-sm font-bold'>{errors.projectName}</p>
                      : null
                  }
                </div>
              </div>

              <div className='flex justify-start gap-5 lg:gap-16 items-center flex-wrap'>
                <label className='block w-32 font-bold' htmlFor=''>
                  Project Code
                  <span className='text-red-500 text-xl'> *</span>
                </label>
                <div className='relative'>
                  <Input
                    size='large'
                    placeholder='Project Code...'
                    className='w-80 lg:w-550px p-3 border'
                    name='projectCode'
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue('projectCode', e.target.value);
                      dispatch(Action.updatePrjCodeAction(e.target.value));
                    }}
                    value={projectCode}
                  />
                  {
                    (errors.projectCode != null) && (touched.projectCode === true)
                      ? <p className='absolute -bottom-9 text-red-500 text-sm font-bold'>{errors.projectCode}</p>
                      : null
                  }
                </div>
              </div>
              <div className='flex justify-start gap-5 lg:gap-16 items-center flex-wrap'>
                <label className='block w-32 font-bold' htmlFor=''>
                  Dates
                  <span className='text-red-500 text-xl'> *</span>
                </label>
                <div className='relative'>
                  <DatePicker
                    name='timeStart'
                    valueTimeStart={timeStart !== '' ? dayjs(timeStart) : undefined }
                    valueTimeEnd={(timeEnd !== '' || timeEnd !== null) ? dayjs(timeEnd) : undefined }
                    onTimeStartBlur={value => {
                      setFieldTouched('timeStart');
                    }}
                    onTimeStartChange={(timeStart, dateString) => {
                      if (timeStart != null) {
                        const myDate = dayjs(timeStart?.valueOf()).toDate();
                        const day = new Date(myDate).toISOString();
                        setFieldValue('timeStart', day);
                        dispatch(Action.updateTimeStartAction(day));
                      } else {
                        setFieldValue('timeStart', '');
                        dispatch(Action.updateTimeStartAction(''));
                      }
                    }}
                    onTimeEndChange={(timeEnd, dateString) => {
                      if (timeEnd != null) {
                        const myDate = dayjs(timeEnd?.valueOf()).toDate();
                        const day = new Date(myDate).toISOString();
                        setFieldValue('timeEnd', day);
                        dispatch(Action.updateTimeEndAction(day));
                      } else {
                        setFieldValue('timeEnd', '');
                        dispatch(Action.updateTimeEndAction(''));
                      }
                    }}
                  />
                  {
                    ((errors.timeStart != null) && ((touched.timeStart === true)))
                      ? <p className='absolute -bottom-8 text-red-500 text-sm font-bold'>{errors.timeStart}</p>
                      : null
                  }
                </div>
              </div>

              <div className='flex justify-start gap-5 lg:gap-16 items-center flex-wrap'>
                <label className='block w-32 font-bold' htmlFor=''>Note</label>
                <div className='relative w-full lg:w-3/4'>
                  <Input.TextArea
                    size='large'
                    rows={3}
                    className='w-full p-3 border'
                    name='note'
                    value={note}
                    onChange={(e) => {
                      setFieldValue('note', e.target.value);
                      dispatch(Action.updatePrjNoteAction(e.target.value));
                    }}
                    onBlur={handleBlur} />
                  {
                    (errors.note != null) && (touched.note === true)
                      ? <p className='absolute -bottom-8 text-red-500 text-sm font-bold'>{errors.note}</p>
                      : null
                  }
                </div>
              </div>

              <div className='flex justify-start gap-5 lg:gap-16 items-center flex-wrap'>
                <span className='block w-32 font-bold'>All User</span>
                <div className='flex justify-start items-center gap-2'>
                  <input
                    id='allUser'
                    className='cursor-pointer'
                    type='checkbox'
                    checked={allUser}
                    onChange={(e) => {
                      setFieldValue('allUser', e.target.checked);
                      dispatch(Action.updateSelectAllUserAction(e.target.checked));
                    }}
                  />
                  <label
                    htmlFor='allUser'
                    className='font-bold cursor-pointer select-none'
                  >
                    Auto add user as a member of this project when creating new user
                  </label>
                </div>
              </div>

              <div className='flex justify-start lg:gap-16 items-center flex-wrap'>
                <span className='block w-32 font-bold'>
                  Project Type
                  <span className='text-red-500 text-xl'> *</span>
                </span>
                <div className='flex justify-between flex-wrap gap-5 w-3/4'>
                  {
                    Object.values(EProjectTypes).map((projectTypes, index) => (
                      <div
                        key={projectTypes}
                        className='relative w-36 h-11 border font-bold rounded overflow-hidden
                        hover:border-blue-500 hover:bg-gray-50'
                      >
                        <input
                          type='radio'
                          name='projectTypes'
                          id={projectTypes}
                          className='peer hidden'
                          checked={isEdit ? index === projectInfo.projectType : index === projectType}
                          value={index}
                          onChange={(e) => {
                            setFieldValue('projectType', e.target.value);
                            dispatch(Action.updatePrjTypeAction(Number(e.target.value)));
                          }}
                        />
                        <label
                          htmlFor={projectTypes}
                          className='flex items-center justify-center w-full h-full cursor-pointer
                          select-none peer-checked:bg-green-550 peer-checked:font-bold peer-checked:text-white'
                        >
                          {projectTypes}
                        </label>
                      </div>
                    ))
                  }
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default memo(General);
