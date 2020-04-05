import * as React from 'react';
import { FiEdit2, FiPlus, FiX } from 'react-icons/fi';
import { Button, ButtonProps } from './button';

export type IconButtonProps = Omit<ButtonProps, 'ref'> & {
  'aria-label': string;
};

export const AddButton = (props: IconButtonProps) => (
  <Button {...props}>
    <FiPlus aria-hidden focusable={false} />
  </Button>
);

export const EditButton = (props: IconButtonProps) => (
  <Button {...props}>
    <FiEdit2 aria-hidden focusable={false} />
  </Button>
);

export const DeleteButton = (props: IconButtonProps) => (
  <Button {...props}>
    <FiX aria-hidden focusable={false} />
  </Button>
);
