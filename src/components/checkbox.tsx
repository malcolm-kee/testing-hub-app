import cx from 'classnames';
import * as React from 'react';
import styles from './checkbox.module.scss';

export type CheckboxProps = Omit<JSX.IntrinsicElements['input'], 'type'> & {
  label: React.ReactNode;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className, label, ...inputProps }, inputRef) {
    return (
      <label className={cx('flex justify-start items-start', className)}>
        <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <input
            {...inputProps}
            type="checkbox"
            className={cx('opacity-0 absolute', styles.input)}
            ref={inputRef}
          />
          <svg
            className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
        <div className="select-none">{label}</div>
      </label>
    );
  }
);
