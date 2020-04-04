import cx from 'classnames';
import { Dialog as ReachDialog } from '@reach/dialog';
import { FiX } from 'react-icons/fi';
import '@reach/dialog/styles.css';
import * as React from 'react';

type DialogProps = React.ComponentPropsWithRef<typeof ReachDialog>;

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  function Dialog({ className, children, ...props }, ref) {
    return (
      <ReachDialog
        {...props}
        className={cx(
          'relative w-3/4 rounded-b-lg border-t-4 border-pink-500',
          className
        )}
        ref={ref}
      >
        <button
          onClick={props.onDismiss}
          className="text-gray-700 absolute top-0 right-0 p-1"
          aria-label="Close Dialog"
          type="button"
        >
          <FiX
            aria-hidden
            focusable={false}
            className="fill-current"
            size={24}
          />
        </button>
        {children}
      </ReachDialog>
    );
  }
);
