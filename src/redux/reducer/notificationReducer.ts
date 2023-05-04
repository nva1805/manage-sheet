
import { ENotifAction } from '../action/notificationAction/constants';
import * as IAC from '../action/notificationAction/interface';

export interface INotificationReducer {
  isSend: boolean
  KomuChannelId: string
}

const INITIAL_STATE = {
  isSend: false,
  KomuChannelId: ''
};

const notificationReducer = (state = INITIAL_STATE, action:
IAC.INotifSendStateAction
| IAC.INotifSendChannelIdAction
| IAC.INotifUpdateAction): INotificationReducer => {
  switch (action.type) {
    case ENotifAction.IS_SEND:
      return {
        ...state,
        isSend: action.payload
      };
    case ENotifAction.KOMU_CHANNEL_ID:
      return {
        ...state,
        KomuChannelId: action.payload
      };
    case ENotifAction.UPDATE_KOMU_NOTIFICATION:
      return {
        ...state,
        isSend: action.payload.isSend,
        KomuChannelId: action.payload.komuChannelId
      };
    default:
      return state;
  }
};

export default notificationReducer;
