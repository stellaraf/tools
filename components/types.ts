import type { ButtonGroupProps, StackProps } from '@chakra-ui/react';

export interface FieldContainerProps extends StackProps {
  title: string;
}

export interface NumberFieldProps extends FieldContainerProps {
  defaultValue: number;
  min?: number;
  max: number;
  value: number;
  step?: number;
  setValue(v: number): void;
  slider?: boolean;
}

type RadioOption<T> = { value: T; label: React.ReactText };

export interface RadioFieldProps<T extends React.ReactText = React.ReactText>
  extends Omit<ButtonGroupProps, 'value'> {
  value: T;
  options: Array<RadioOption<T>>;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}
