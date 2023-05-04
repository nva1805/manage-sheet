import { IMember } from '../interface/interface';

const handleSortByBranch = (branch: number, filterList: IMember[]): IMember[] => {
  if (branch !== 0) {
    const memberBranchList = filterList.filter((member) => member.branchId === branch);
    return (memberBranchList);
  } else {
    return (filterList);
  }
};

const handleSortByPotion = (potionString: string, filterList: IMember[]): IMember[] => {
  const position = Number(potionString);
  if (potionString !== 'all') {
    const memberPotionList = filterList.filter((member) => member.type === position);
    return (memberPotionList);
  } else {
    return (filterList);
  }
};

export { handleSortByBranch, handleSortByPotion };
