enum EProjectStatus {
  ACTIVE = 'Active Projects',
  DEACTIVE = 'Deactive Projects',
  ALL = 'All Projects',
}

enum EProjectTypes {
  TIME_MATERIALS = 'Time & Materials',
  FIXED_FEE = 'Fixed Fee',
  NON_BILLABLE = 'Non-Billable',
  ODC = 'ODC',
  PRODUCT = 'Product',
  TRAINING = 'Training',
}

const memberBranch: { [key: number]: string } = {
  1: 'Hà Nội',
  3: 'Hà Nội 2',
  8: 'Sài Gòn 1',
  31: 'Kon tum',
  32: 'Đà Nẵng'
};
const memberType: { [key: number]: string } = {
  0: 'Staff',
  1: 'Internship',
  2: 'Collaborator'
};
const memberPosition: { [key: number]: string } = {
  0: 'Intern 0',
  1: 'Intern 1',
  2: 'Intern 2',
  3: 'Intern 3',
  4: 'Fresher -',
  5: 'Fresher',
  6: 'Fresher +',
  7: 'Junior -',
  8: 'Junior',
  9: 'Junior +',
  10: 'Middle -',
  11: 'Middle',
  12: 'Middle +',
  13: 'Senior -',
  14: 'Senior',
  15: 'Senior +'
};

const optionSelectDates = [
  {
    label: 'Week',
    value: '0'
  },
  {
    label: 'Month',
    value: '1'
  },
  {
    label: 'Quarter',
    value: '2'
  },
  {
    label: 'Year',
    value: '3'
  },
  {
    label: 'All time',
    value: '4'
  },
  {
    label: 'Custom time',
    value: '5'
  }
];

const projectType: { [key: number]: string } = {
  0: 'T&M',
  1: 'FF',
  2: 'NB',
  3: 'ODC',
  4: 'Product',
  5: 'Training'
};

const optionMemberPosition = [
  { value: '0', label: 'Member' },
  { value: '1', label: 'Project Manager' },
  { value: '2', label: 'Shadow' },
  { value: '3', label: 'Deactive' }
];

const positionOption = [
  { value: 'all', label: 'All' },
  { value: '0', label: 'Staff' },
  { value: '1', label: 'Intern ship' },
  { value: '2', label: 'Collaborator' }
];

const steps = [
  {
    title: 'General'
  },
  {
    title: 'Team'
  },
  {
    title: 'Task'
  },
  {
    title: 'Notification'
  }
];

export {
  EProjectStatus,
  EProjectTypes,
  memberBranch,
  memberPosition,
  optionSelectDates,
  projectType,
  positionOption,
  optionMemberPosition,
  steps,
  memberType
};
