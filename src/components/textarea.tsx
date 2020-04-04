import cx from 'classnames';
import { callAll } from 'lib/fp';
import * as React from 'react';

export type TextareaProps = JSX.IntrinsicElements['textarea'] & {
  onChangeValue?: (value: string) => void;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      onChange,
      onChangeValue,
      className,
      readOnly,
      disabled,
      ...props
    }: TextareaProps,
    ref
  ) {
    return (
      <textarea
        {...props}
        className={cx(
          'block m-0 w-full min-w-0 border border-gray-300 px-3 py-1 shadow-inner text-gray-900 rounded-lg',
          readOnly || disabled ? 'bg-gray-200' : 'bg-white',
          className
        )}
        onChange={callAll(
          onChange,
          onChangeValue && ((ev) => onChangeValue(ev.target.value))
        )}
        readOnly={readOnly}
        disabled={disabled}
        ref={ref}
      />
    );
  }
);
