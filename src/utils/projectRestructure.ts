import { IProjectItem, IProjectsCustomer } from '../interface/interface';

export const projectRestructure = (projectsList: IProjectItem[]): IProjectsCustomer[] => {
  const result: IProjectsCustomer[] = [];

  projectsList.forEach((item) => {
    const customerName = item.customerName;
    const index = result.findIndex((resultItem) => resultItem.customerName === customerName);
    if (index !== -1) {
      result[index].projects.push(item);
    } else {
      result.push({ customerName, projects: [item] });
    }
  });
  return result;
};
