import React, { useEffect, useState } from 'react';

interface Props {
  labelTitle: string
  htmlFor: string
  type: string
  inputType?: 'input' | 'textarea'
  value?: string
  name?: string
  className?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextField = (props: Props): JSX.Element => {
  const { labelTitle, inputType = 'input', type = 'text', htmlFor = 'input', value, name, onChange, className } = props;
  const [activeClass, setActiveClass] = useState(false);

  const handleMovePosition = (): void => {
    setActiveClass(true);
  };

  useEffect(() => {
    if (value?.length !== 0) {
      setActiveClass(true);
    }
  }, [value]);
  const handleBlur = (): void => {
    if (value !== '') {
      setActiveClass(true);
    } else {
      setActiveClass(false);
    }
  };

  const InputElement = React.createElement(inputType === 'textarea' ? 'textarea' : 'input',
    {
      id: htmlFor,
      type,
      onBlur: handleBlur,
      value,
      name,
      onChange,
      className: 'border-b border-b-neutral-500 py-2 text-base w-full focus:outline-none focus:border-b-2 focus:border-b-red-700'
    });

  return (
    <div className={`relative w-full  ${className ?? ''}`} onClick={handleMovePosition}>
      <label
        htmlFor={htmlFor}
        className={activeClass
          ? 'absolute -top-3 left-0 text-xs transition-none md:transition-all md:duration-200 md:ease-out text-neutral-600 cursor-text'
          : 'absolute top-3 left-0 text-base transition-all duration-100 ease-out cursor-text'}
      >
        {labelTitle}
      </label>
      {InputElement}
    </div>
  );
};
