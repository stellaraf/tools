import { useCallback } from 'react';
import { Button, ButtonGroup, useColorMode, useColorModeValue } from '@chakra-ui/react';

import type { ButtonProps } from '@chakra-ui/react';
import type { RadioFieldProps } from './types';

export const RadioField: React.FC<RadioFieldProps> = (props: RadioFieldProps) => {
  const { value, options, setValue, ...rest } = props;
  const { colorMode } = useColorMode();
  const bg = useColorModeValue('blue.500', 'blue.300');
  const color = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('blue.600', 'blue.200');

  function selectedBtnCallback<T extends unknown>(value: T, state: T): ButtonProps {
    if (value === state) {
      return {
        bg,
        color,
        borderColor,
        _hover: { bg: 'blue.400' },
        _active: { bg: 'blue.500' },
      } as ButtonProps;
    } else {
      return {} as ButtonProps;
    }
  }
  const btnProps = useCallback(selectedBtnCallback, [value, colorMode]);
  return (
    <ButtonGroup
      size="lg"
      isAttached
      variant="outline"
      colorScheme="blue"
      css={{ '& > *:not(:last-child)': { marginRight: '-1px' } }}
      {...rest}
    >
      {options.map(opt => {
        const { value: optValue, label } = opt;
        return (
          <Button key={optValue} onClick={() => setValue(optValue)} {...btnProps(optValue, value)}>
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
