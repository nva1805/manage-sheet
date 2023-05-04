import { useDispatch } from 'react-redux';
import { IProjectSummitData } from '../interface/interface';
import { updateGeneralFormAction } from '../redux/action/generalAction/action';
import { memberUpdateSelectedListAction } from '../redux/action/memberAction/action';
import { isSendNotifTokomuAction } from '../redux/action/notificationAction/action';
import { setProjectEditIfAction } from '../redux/action/projectAction/action';
import { resetListTaskCanBillable } from '../redux/action/taskAction/action';

export const useResetDataSummit = (): (() => void) => {
  const dispatch = useDispatch();
  const generalFormDataReset: IProjectSummitData = {
    code: '',
    customerId: null,
    isAllUserBelongTo: false,
    isNotifyToKomu: false,
    komuChannelId: '',
    name: '',
    note: undefined,
    projectType: 1,
    tasks: [],
    timeEnd: '',
    timeStart: '',
    users: []
  };
  return () => {
    dispatch(setProjectEditIfAction(generalFormDataReset));
    dispatch(updateGeneralFormAction(generalFormDataReset));
    dispatch(memberUpdateSelectedListAction([]));
    dispatch(resetListTaskCanBillable());
    dispatch(isSendNotifTokomuAction(false));
  };
};
