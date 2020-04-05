import { callAll } from 'lib/fp';
import { useId } from 'lib/id';
import * as React from 'react';
import { Label } from './label';
import { Select, SelectProps } from './select';

export type SelectFieldProps = SelectProps & {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  showHelpTextWhenFocus?: boolean;
};

export const SelectField = React.forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(function SelectField(
  { label, helpText, showHelpTextWhenFocus, ...props },
  ref
) {
  const displayedId = useId(props.id);

  const [isFocused, setIsFocused] = React.useState(false);

  const shouldShowHelpText = showHelpTextWhenFocus ? isFocused : !!helpText;

  return (
    <div>
      {label && (
        <Label htmlFor={displayedId}>
          {label}
          {props.required && ' *'}
        </Label>
      )}
      <Select
        {...props}
        id={displayedId}
        aria-describedby={helpText ? `${displayedId}-help` : undefined}
        onFocus={callAll(props.onFocus, () => setIsFocused(true))}
        onBlur={callAll(props.onBlur, () => setIsFocused(false))}
        ref={ref}
      />
      {shouldShowHelpText && (
        <p id={`${displayedId}-help`} className="pl-2">
          <small>{helpText}</small>
        </p>
      )}
    </div>
  );
});
