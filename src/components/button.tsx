import cx from 'classnames';
import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export type ButtonStyleProps = {
  variant?: 'primary' | 'none';
  size?: 'small';
};

export type ButtonProps = JSX.IntrinsicElements['button'] & ButtonStyleProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { type = 'button', variant, size, className, disabled, ...props },
    ref
  ) {
    return (
      <button
        type={type}
        className={cx(
          getButtonStyleClass({
            variant,
            size,
            disabled,
          }),
          className
        )}
        disabled={disabled}
        {...props}
        ref={ref}
      />
    );
  }
);

export type LinkButtonProps = LinkProps & ButtonStyleProps;

export const LinkButton = ({
  variant,
  size,
  className,
  ...props
}: LinkButtonProps) => (
  <Link
    {...props}
    className={cx(
      getButtonStyleClass({
        variant,
        size,
      }),
      className
    )}
  />
);

export const getButtonStyleClass = ({
  variant = 'primary',
  size,
  disabled,
}: ButtonStyleProps & { disabled?: boolean }) =>
  cx(
    'inline-flex items-center justify-center rounded',
    size === 'small' ? 'px-2 py-1 text-sm' : 'px-4 py-2',
    disabled
      ? 'bg-gray-500 text-gray-100 cursor-not-allowed'
      : variant === 'primary'
      ? 'bg-pink-500 text-gray-100 shadow'
      : ''
  );
