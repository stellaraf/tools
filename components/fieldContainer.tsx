import { Stack, HStack, FormControl, FormLabel } from '@chakra-ui/react';

import type { FieldContainerProps } from './types';

export const FieldContainer: React.FC<FieldContainerProps> = (props: FieldContainerProps) => {
  const { title, children, ...rest } = props;
  return (
    <Stack align="flex-start" direction="column" {...rest}>
      <FormControl>
        <FormLabel>{title}</FormLabel>
        <HStack w="100%" spacing={8}>
          {children}
        </HStack>
      </FormControl>
    </Stack>
  );
};
