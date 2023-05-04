import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ERoute } from '../../../router/routerLink';
import { toast } from 'react-toastify';
import {
  createOrEditProject, getProjectInfo
} from '../../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { IGeneralState, IProjectSummitData, IUser } from '../../../interface/interface';
import { isAxiosError } from 'axios';
import { useResetDataSummit } from '../../../hooks/useResetDataSummit';
import { steps } from '../../../constants/constants';
import Button from '../../../components/Button/Button';
import { updateNotification } from '../../../redux/action/notificationAction/action';
import { createEditLoading, setProjectEditIfAction } from '../../../redux/action/projectAction/action';

const FormStep = (): JSX.Element => {
  const param = useParams();
  const navigate = useNavigate();
  const resetData = useResetDataSummit();
  const [current, setCurrent] = useState(0);
  const [isAcceptSummit, setIsAcceptSummit] = useState(true);
  const {
    allUser,
    note,
    projectCode,
    projectCustomer,
    projectName,
    projectType,
    timeEnd,
    timeStart
  } = useSelector((state: IGeneralState) => state.generalReducer);
  const { memberSelected } = useSelector((state: IGeneralState) => state.memberReducer);
  const { taskCanBillable } = useSelector((state: IGeneralState) => state.taskReducer);
  const { isSend, KomuChannelId } = useSelector((state: IGeneralState) => state.notificationReducer);
  const { isEdit, projectInfo, isCreateEditLoading } = useSelector((state: IGeneralState) => state.projectReducer);

  const dispatch = useDispatch();

  const formStepTitle = location.pathname.includes('create')
    ? 'Create Project'
    : `Edit Project: ${projectInfo.name}`;
  const formStepSummitType = location.pathname.includes('create')
    ? 'Save'
    : 'Update';

  const handleStepChange = (step: number): void => {
    const nextStep = step % 4;
    setCurrent(Math.max(Math.min(nextStep, 3), 0));
    switch (nextStep) {
      case 0:
        isEdit && (param.id !== undefined) && location.pathname.includes('edit')
          ? navigate(`${ERoute.EDIT_PROJECT}/${param.id.toString()}`)
          : navigate(ERoute.CREATE_PROJECT);
        break;
      case 1:
        navigate(ERoute.PROJECT_TEAM);
        break;
      case 2:
        navigate(ERoute.PROJECT_TASK);
        break;
      case 3:
        navigate(ERoute.PROJECT_NOTIFICATION);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (location.pathname.includes(ERoute.PROJECT_TEAM)) {
      setCurrent(1);
    } else if (location.pathname.includes(ERoute.PROJECT_TASK)) {
      setCurrent(2);
    } else if (location.pathname.includes(ERoute.PROJECT_NOTIFICATION)) {
      setCurrent(3);
    }
  }, [location.pathname]);

  const handleGetProjectDataToEdit = async (): Promise<void> => {
    try {
      const res = await getProjectInfo(Number(param.id));
      dispatch(setProjectEditIfAction(res.data.result));
      dispatch(updateNotification({
        isSend: res.data.result.isNotifyToKomu,
        komuChannelId: res.data.result.komuChannelId
      }));
    } catch (error) {
      const errorMessage = isAxiosError(error)
        ? error.message
        : 'Cant\'t get project data';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (!isEdit && location.pathname.includes('edit') && param.id !== null) {
      void handleGetProjectDataToEdit();
    }

    return () => {
      resetData();
    };
  }, []);

  useEffect(() => {
    if ((projectCode.trim().length > 0) &&
     (projectCustomer != null) &&
     (projectName.trim().length > 0) &&
      (timeStart.trim().length > 0)) {
      setIsAcceptSummit(false);
    } else {
      setIsAcceptSummit(true);
    }
  }, [projectCode, projectCustomer, projectName, timeStart]);

  const validateSummitData = (teamList: IUser[]): string | null => {
    if (teamList.length === 0) {
      return 'Project must have at least one member!';
    }
    return teamList.filter((member) => member.type === 1).length === 0
      ? 'Project must have at least one PM!'
      : null;
  };

  const getSummitData = (): IProjectSummitData => {
    const tasks = (isEdit && projectInfo.tasks.length > 0 && taskCanBillable.length === 0)
      ? projectInfo.tasks
      : taskCanBillable.map((task) => ({ taskId: task.id, billable: task.billable }));

    const users = (isEdit && projectInfo.users.length > 0 && memberSelected.length === 0)
      ? projectInfo.users
      : memberSelected.map((user) => ({ userId: user.id, type: user.type }));

    const id = location.pathname.includes('create') ? undefined : projectInfo.id;

    return {
      code: projectCode,
      customerId: projectCustomer,
      isAllUserBelongTo: allUser,
      isNotifyToKomu: isSend,
      komuChannelId: KomuChannelId,
      name: projectName,
      note,
      projectType,
      tasks,
      timeEnd,
      timeStart,
      id,
      users
    };
  };

  const handleCreateUpdateProject = async (): Promise<void> => {
    const summitData = getSummitData();
    const validationError = validateSummitData(summitData.users);

    if (validationError != null) {
      toast.warning(validationError);
      navigate(ERoute.PROJECT_TEAM);
      setIsAcceptSummit(false);
      return;
    }

    try {
      dispatch(createEditLoading(true));
      const response = await createOrEditProject(summitData);
      if (response.status === 200) {
        const errorMessage = isEdit
          ? 'Edit project successful'
          : 'Create new project successful';
        toast.success(errorMessage);
        resetData();
        navigate(ERoute.PROJECT);
      }
      dispatch(createEditLoading(false));
    } catch (error) {
      dispatch(createEditLoading(false));

      const errorMessage = isAxiosError(error)
        ? error.response?.data?.error.message
        : isEdit
          ? 'Fail to edit new project'
          : 'Fail to create new project';
      toast.error(errorMessage);
    }
  };

  return (
    <div className='m-0 lg:m-6 bg-white shadow-xl min-h-250px lg:h-610px overflow-y-scroll relative'>
      <div className='p-3 relative'>
        <h3 className='text-2xl'>
          {formStepTitle}
        </h3>
        <hr className='border dark:bg-gray-800 mb-2' />
        <Steps
          current={current}
          onChange={handleStepChange}
          items={steps}
        />
        <div className='h-450px overflow-scroll'>
          <Outlet />
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-5'>
            <Button key="prev" onClick={() => handleStepChange(current - 1)} >
            Previous
            </Button>

            <Button key="next" onClick={() => handleStepChange(current + 1)} >
            Next
            </Button>
          </div>
          <div className='flex gap-5'>
            <Button key="back" className='hidden lg:block' onClick={() => navigate(ERoute.PROJECT)} >
            Cancel
            </Button>
            <Button
              key="submit"
              disabled={isAcceptSummit || isCreateEditLoading}
              onClick={handleCreateUpdateProject as () => void}
            >
              {formStepSummitType}
            </Button >
          </div>
        </div >
        <style>
          {`
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0,0,0,0.2);
      }
    `}
        </style>
      </div>
    </div>
  );
};

export default FormStep;
