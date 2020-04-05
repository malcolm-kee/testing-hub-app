import { MenuButton as ReachMenuButton } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import cx from 'classnames';
import * as React from 'react';
import { ButtonStyleProps, getButtonStyleClass } from './button';
import './menu.scss';
export { Menu, MenuItem, MenuList } from '@reach/menu-button';

export type MenuButtonProps = JSX.IntrinsicElements['button'] &
  ButtonStyleProps & {
    children: React.ReactNode;
  };

export const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton({ variant, size, className, ...props }, ref) {
    return (
      <ReachMenuButton
        {...props}
        className={cx(
          getButtonStyleClass({
            variant,
            size,
          }),
          className
        )}
        ref={ref}
      />
    );
  }
);
