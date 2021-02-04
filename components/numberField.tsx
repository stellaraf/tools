import {
  Slider,
  NumberInput,
  SliderTrack,
  SliderThumb,
  NumberInputField,
  SliderFilledTrack,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { FieldContainer } from './fieldContainer';

import type { NumberFieldProps } from './types';

export const NumberField: React.FC<NumberFieldProps> = (props: NumberFieldProps) => {
  const {
    title,
    defaultValue,
    min = 0,
    max,
    value,
    setValue,
    onChange,
    step,
    children,
    slider = false,
    ...rest
  } = props;

  function handleChange(asString: string): void {
    if (asString === '') {
      setValue(0);
    } else {
      setValue(Number(asString));
    }
  }

  return (
    <FieldContainer
      title={title}
      width={typeof children === 'undefined' ? '66%' : '100%'}
      {...rest}
    >
      <NumberInput
        size="lg"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        defaultValue={defaultValue}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {slider && (
        <Slider
          min={min}
          flex="1"
          step={step}
          max={max}
          value={value}
          onChange={setValue}
          focusThumbOnChange={false}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="32px" />
        </Slider>
      )}
      {children}
    </FieldContainer>
  );
};
