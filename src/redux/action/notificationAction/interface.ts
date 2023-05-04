import { ENotifAction } from './constants';

// notification
export interface INotifSendStateAction {
  type: ENotifAction.IS_SEND
  payload: boolean
}

export interface INotifSendChannelIdAction {
  type: ENotifAction.KOMU_CHANNEL_ID
  payload: string
}

export interface INotifUpdateAction {
  type: ENotifAction.UPDATE_KOMU_NOTIFICATION
  payload: {
    isSend: boolean
    komuChannelId: string
  }
}
