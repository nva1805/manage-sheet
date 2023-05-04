import { Button as AntButton } from 'antd';
import React, { ReactNode } from 'react';

interface ButtonProps {
  className?: string
  type?: 'text' | 'link' | 'ghost' | 'default' | 'dashed' | 'primary'
  style?: React.CSSProperties
  onClick?: () => void
  children?: ReactNode
  disabled?: boolean
}
const Button = ({ className, type = 'primary', onClick, style, children, disabled }: ButtonProps): JSX.Element => {
  return (
    <div>
      <AntButton
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`bg-green-550 border text-white border-green-550 hover:bg-white
         hover:text-black transition-all duration-500 rounded font-medium text-base
         h-10 min-w-24 ${className ?? ''}`}
        style={style}
      >
        {children}
      </AntButton>
    </div>
  );
};

export default Button;
