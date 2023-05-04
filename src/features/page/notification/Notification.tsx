import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGeneralState } from '../../../interface/interface';
import { Input } from 'antd';
import {
  isSendNotifTokomuAction, setKomuChannelIdAction
} from '../../../redux/action/notificationAction/action';

const Notification = (): JSX.Element => {
  const { isSend, KomuChannelId } = useSelector(
    (state: IGeneralState) => state.notificationReducer
  );
  const { isEdit, projectInfo } = useSelector(
    (state: IGeneralState) => state.projectReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && location.pathname.includes('edit')) {
      dispatch(isSendNotifTokomuAction(projectInfo.isNotifyToKomu));
      dispatch(setKomuChannelIdAction(projectInfo.komuChannelId));
    }
  }, []);

  const handleSendNotification = (): void => {
    if (!isSend) {
      dispatch(setKomuChannelIdAction(''));
    }
    dispatch(isSendNotifTokomuAction(!isSend));
  };
  const handleGetKomuChannelID = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setKomuChannelIdAction(event.target.value));
  };
  return (
    <div className='mt-10 h-96 px-3'>
      <div className='flex justify-start gap-4 items-center'>
        <input
          className='w-4 h-4'
          type="checkbox" name=""
          id="sendNotification"
          checked={isSend}
          onChange={handleSendNotification}
        />
        <label
          className='font-bold cursor-pointer select-none'
          htmlFor="sendNotification">Gửi thông báo đến Komu
        </label>
      </div>
      <Input
        size='large'
        className='mt-5'
        disabled={!isSend}
        placeholder='Komu Channel Id'
        onChange={(e) => handleGetKomuChannelID(e)}
        value={KomuChannelId}
      />
    </div>
  );
};

export default memo(Notification);
