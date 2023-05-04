import React, { memo, useState } from 'react';
import { IGeneralState, IProjectItem, IProjectsCustomer } from '../../../../../interface/interface';
import { Dropdown, Tooltip, Button, Space, MenuProps } from 'antd';
import { AiOutlineCaretDown, AiFillEye } from 'react-icons/ai';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { ERoute } from '../../../../../router/routerLink';
import { useNavigate } from 'react-router-dom';
import { activeProject, deleteProject, inActiveProject } from '../../../../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import ViewProject from './ViewProject/ViewProject';
import useModal from '../../../../../hooks/useModal';
import ConfirmModal from '../../../../../components/ConfirmModal/ConfirmModal';
import { projectType } from '../../../../../constants/constants';
import {
  refreshProjectAction,
  setProjectId
} from '../../../../../redux/action/projectAction/action';

interface IProjectItemProps {
  projectItem: IProjectsCustomer
}

const ProjectItem: React.FC<IProjectItemProps> = ({ projectItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isRefresh } = useSelector((state: IGeneralState) => state.projectReducer);
  const [projectData, setProjectData] = useState<IProjectItem | null>(null);
  const { isOpenModal, handleToggleModal } = useModal(false);
  const { isOpenModal: isOpenModalDelete, handleToggleModal: handleToggleModalDelete } = useModal(false);
  const { isOpenModal: isOpenModalActive, handleToggleModal: handleToggleModalActive } = useModal(false);

  const projectStatusRevert = projectData?.status === 0 ? 'deactivate' : 'activate';

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '0',
      icon: <MdModeEditOutline />
    },
    {
      label: 'View',
      key: '1',
      icon: <AiFillEye />
    },
    {
      label: projectData?.status === 0 ? 'Deactive' : 'Active',
      key: '2',
      icon: projectData?.status === 0 ? <FaTimes /> : <TiTick />
    },
    {
      label: 'Delete',
      key: '3',
      icon: <MdDelete />,
      danger: true
    }
  ];
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log(e);
    switch (e.key) {
      case '0':
        void handleClickEdit();
        break;
      case '1':
        handleToggleModal();
        break;
      case '2':
        handleToggleModalActive();
        break;
      case '3':
        handleToggleModalDelete();
        break;
      default:
        break;
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick
  };

  const handleClickAction = (project: IProjectItem): void => {
    setProjectData(project);
  };

  const handleClickEdit = async (): Promise<void> => {
    if (projectData === null) {
      return;
    }
    dispatch(setProjectId(projectData.id));
    navigate(`${ERoute.EDIT_PROJECT}/${(projectData.id)}`);
  };

  const handleActiveOrDeactive = async (): Promise<void> => {
    if (projectData != null) {
      if (projectData.status === 0) {
        try {
          const res = await inActiveProject(projectData.id);
          if (res.status === 200) {
            toast.success('Deactivating the project was successful');
          }
        } catch (error) {
          const errorMessage = isAxiosError(error)
            ? error.message
            : 'An error occurred when deactivating the project';
          toast.error(errorMessage);
        }
      } else {
        try {
          const res = await activeProject(projectData.id);
          if (res.status === 200) {
            toast.success('Activating the project was successful');
          }
        } catch (error) {
          const errorMessage = isAxiosError(error)
            ? error.message
            : 'An error occurred when activating the project';
          toast.error(errorMessage);
        }
      }
      dispatch(refreshProjectAction(!isRefresh));
    }
  };
  const handleDeleteProject = async (): Promise<void> => {
    if (projectData != null) {
      try {
        const res = await deleteProject(projectData.id);
        if (res.status === 200) {
          toast.success('Deleting the project was successful');
        }
      } catch (error) {
        const errorMessage = isAxiosError(error)
          ? error.message
          : 'An error occurred when deleting the project';
        toast.error(errorMessage);
      }
      dispatch(refreshProjectAction(!isRefresh));
    }
  };
  return (
    <div className='shadow shadow-gray-300 rounded-lg my-5 overflow-hidden'>
      <div className='bg-gray-300 text-black py-3 px-4 rounded-t-lg font-medium text-lg'>
        {projectItem.customerName}
      </div>
      <div className='leading-8'>
        {
          projectItem.projects.map((project) => {
            return (
              <div key={project.id} className='flex justify-between border-y px-2 py-2 hover:bg-gray-200'>
                <div className='text-xs text-white font-medium cursor-default'>
                  <span className='mr-4 text-base text-black font-normal align-middle max-w-36 inline-block truncate'>{project.name}</span>
                  {
                    project.pms.length > 5
                      ? <Tooltip title={project.pms.join(', ')} overlayClassName='max-w-sm' >
                        <span className='bg-blue-500 px-2 rounded-xl pb-2px mb-0 mr-3 max-w-24
                        sm:max-w-xs lg:max-w-3xl 2xl:max-w-4xl inline-block truncate align-middle'>
                          {project.pms.join(', ')}
                        </span>
                      </Tooltip>
                      : <span className='bg-blue-500 px-2 rounded-xl pb-2px mb-0 mr-3 max-w-24
                      sm:max-w-xs 2xl:max-w-4xl inline-block truncate align-middle'
                      >
                        {project.pms.join(', ')}
                      </span>
                  }
                  <span
                    className='bg-red-500 px-2 rounded-xl pb-2px mr-3 inline-block mb-2px sm:mb-0'
                  >
                    {
                      project.activeMember > 1
                        ? `${project.activeMember} members`
                        : `${project.activeMember} member`
                    }
                  </span>
                  <span
                    className='bg-yellow-500 px-2 rounded-xl pb-2px mr-3 mb-2px sm:mb-0'
                  >
                    {projectType[project.projectType]}
                  </span>
                  <span className='bg-green-500 px-2 rounded-xl pb-2px mr-3 inline-block '>
                    {new Date(project.timeStart).toLocaleDateString('en-GB')}
                    {(project.timeEnd != null) ? ' - ' + new Date(project.timeEnd).toLocaleDateString('en-GB') : ''}
                  </span>
                  <span
                    className='bg-red-500 px-2 rounded-xl pb-2px mr-3 inline-block mb-2px sm:mb-0'
                  >
                    {project.status === 0 ? 'Active' : 'Deactive'}
                  </span>
                </div>
                <div onClick={() => handleClickAction(project)}>
                  <Dropdown menu={menuProps} arrow trigger={['click']}>
                    <Button>
                      <Space>
                        Action
                        <AiOutlineCaretDown />
                      </Space>
                    </Button>
                  </Dropdown>
                </div>
              </div>
            );
          })
        }
      </div>
      {
        isOpenModal &&
        <ViewProject
          isOpenModalViewPrj={isOpenModal}
          onCloseModal={handleToggleModal}
          projectID={Number(projectData?.id)}/>
      }
      <ConfirmModal
        isOpenConfirmModal={isOpenModalDelete}
        contentText={`Are you sure you want to delete the project '${projectData?.name ?? ''}'?`}
        onConfirm={handleDeleteProject as () => void}
        summitText='Delete'
        toggleConfirmModal={handleToggleModalDelete}
      />
      <ConfirmModal
        isOpenConfirmModal={isOpenModalActive}
        contentText={`Are you sure you want to ${projectStatusRevert} the project '${projectData?.name ?? ''}'?`}
        onConfirm={handleActiveOrDeactive as () => void}
        summitText='Yes'
        toggleConfirmModal={handleToggleModalActive}
      />
    </div>
  );
};

export default memo(ProjectItem);
