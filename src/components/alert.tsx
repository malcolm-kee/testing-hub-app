import { Alert as ReachAlert } from '@reach/alert';
import cx from 'classnames';
import * as React from 'react';

export type AlertProps = JSX.IntrinsicElements['div'] & {
  children: React.ReactNode;
  variant?: 'error';
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert({ className, variant, ...props }, forwardedRef) {
    return (
      <ReachAlert
        className={cx(
          variant === 'error' &&
            'bg-red-200 pl-2 pr-2 py-2 border-l-4 border-red-700 rounded',
          className
        )}
        {...props}
        ref={forwardedRef}
      />
    );
  }
);
