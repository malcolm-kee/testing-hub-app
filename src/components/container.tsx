import cx from 'classnames';
import * as React from 'react';

export const Container = (props: JSX.IntrinsicElements['div']) => (
  <div
    {...props}
    className={cx('max-w-4xl mx-auto py-2 px-4', props.className)}
  />
);
