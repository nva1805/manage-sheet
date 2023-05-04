import { ENotifAction } from './constants';
import { INotifSendChannelIdAction, INotifSendStateAction, INotifUpdateAction } from './interface';

// notification
export const isSendNotifTokomuAction = (payload: boolean): INotifSendStateAction => {
  return {
    type: ENotifAction.IS_SEND,
    payload
  };
};

export const setKomuChannelIdAction = (payload: string): INotifSendChannelIdAction => {
  return {
    type: ENotifAction.KOMU_CHANNEL_ID,
    payload
  };
};

export const updateNotification = (
  payload: {
    isSend: boolean
    komuChannelId: string
  }
): INotifUpdateAction => {
  return {
    type: ENotifAction.UPDATE_KOMU_NOTIFICATION,
    payload
  };
};
