import * as React from 'react';
import { DisclosureButton as ReachDisclosureButton } from '@reach/disclosure';

export { Disclosure, DisclosurePanel } from '@reach/disclosure';

export type DisclosureButtonProps = JSX.IntrinsicElements['button'] & {
  children: React.ReactNode;
};

export const DisclosureButton = React.forwardRef<
  HTMLButtonElement,
  DisclosureButtonProps
>(function DisclosureButton({ type = 'button', ...props }, forwardedRef) {
  return <ReachDisclosureButton type={type} {...props} ref={forwardedRef} />;
});
