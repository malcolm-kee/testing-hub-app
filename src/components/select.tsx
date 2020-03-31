import cx from 'classnames';
import { callAll } from 'lib/fp';
import * as React from 'react';

export type SelectProps = JSX.IntrinsicElements['select'] & {
  onChangeValue?: (value: string) => void;
  noEmptyOption?: boolean;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      onChange,
      onChangeValue,
      noEmptyOption,
      className,
      disabled,
      placeholder = 'Select one',
      children,
      ...props
    }: SelectProps,
    forwardedRef
  ) {
    return (
      <select
        {...props}
        className={cx(
          'block m-0 w-full min-w-0 border border-gray-300 px-3 py-1 shadow-inner text-gray-900 rounded-lg',
          disabled ? 'bg-gray-200' : 'bg-white',
          className
        )}
        onChange={callAll(
          onChange,
          onChangeValue && ((ev) => onChangeValue(ev.target.value))
        )}
        disabled={disabled}
        ref={forwardedRef}
      >
        {!noEmptyOption && <option value="">{placeholder}</option>}
        {children}
      </select>
    );
  }
);
