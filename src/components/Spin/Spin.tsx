import React from 'react';
import { Spin as AntSpin } from 'antd';

interface SpinProps {
  tip?: string
  isLoading: boolean
}

const Spin = (props: SpinProps): JSX.Element => {
  const { tip, isLoading } = props;
  return <>
    {
      isLoading &&
      <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 cursor-wait z-50'>
        <AntSpin tip={tip} className='absolute top-1/3 left-1/2 -translate-x-1/2' size='large' />
      </div>
    }
  </>;
};
export default Spin;
