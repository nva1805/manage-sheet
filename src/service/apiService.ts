import { AxiosResponse } from 'axios';
import { ICreateClient, IProjectSummitData, IUserLoginData } from '../interface/interface';
import { axiosInstance } from '../utils/axiosInstance';

const login = async (dataLogin: IUserLoginData): Promise<Response> => {
  return await axiosInstance.post('/api/TokenAuth/Authenticate', dataLogin);
};

const getAllProject = async (qStatus: string, qSearch: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(`/api/services/app/Project/getAll?status=${qStatus}&search=${qSearch}`);
};

const getQuantityProject = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get('/api/services/app/Project/GetQuantityProject');
};

const getAllCustomer = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get('/api/services/app/Customer/GetAll');
};

const getUserNotPagging = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get('/api/services/app/User/GetUserNotPagging');
};

const getAllBranchFilter = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get('/api/services/app/Branch/GetAllBranchFilter?isAll=true');
};

const getAllTask = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get('/api/services/app/Task/GetAll');
};

const createOrEditProject = async (dataSummit: IProjectSummitData): Promise<AxiosResponse> => {
  return await axiosInstance.post('/api/services/app/Project/Save', dataSummit);
};

const createNewClient = async (dataSummit: ICreateClient): Promise<AxiosResponse> => {
  return await axiosInstance.post('/api/services/app/Customer/Save', dataSummit);
};

const getProjectInfo = async (id: number | undefined): Promise<AxiosResponse> => {
  const inputParam = id !== undefined ? id.toString() : '';
  return await axiosInstance.get(`/api/services/app/Project/Get?input=${inputParam}`);
};

const deleteProject = async (id: number): Promise<AxiosResponse> => {
  return await axiosInstance.delete(`/api/services/app/Project/Delete?Id=${id}`);
};

const activeProject = async (id: number): Promise<AxiosResponse> => {
  return await axiosInstance.post('/api/services/app/Project/Active', { id });
};

const inActiveProject = async (id: number): Promise<AxiosResponse> => {
  return await axiosInstance.post('/api/services/app/Project/Inactive', { id });
};

const viewProjectTeam = async (id: number, startTime: string, endTime: string): Promise<AxiosResponse> => {
  return await axiosInstance
    .get(`api/services/app/TimeSheetProject/GetTimeSheetStatisticTeams?projectId=${id}&startDate=${startTime}&endDate=${endTime}`);
};

const viewProjectTask = async (id: number, startTime: string, endTime: string): Promise<AxiosResponse> => {
  return await axiosInstance
    .get(`/api/services/app/TimeSheetProject/GetTimeSheetStatisticTasks?projectId=${id}&startDate=${startTime}&endDate=${endTime}`);
};

export {
  login,
  getAllProject,
  getAllCustomer,
  getUserNotPagging,
  getAllTask,
  createOrEditProject,
  createNewClient,
  getQuantityProject,
  getProjectInfo,
  activeProject,
  inActiveProject,
  deleteProject,
  viewProjectTeam,
  viewProjectTask,
  getAllBranchFilter
};
