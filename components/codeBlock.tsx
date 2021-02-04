import { Box, useColorModeValue } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

export const CodeBlock: React.FC<BoxProps> = (props: BoxProps) => {
  const bg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  return (
    <Box
      p={4}
      mt={4}
      as="pre"
      boxSize="100%"
      textAlign="left"
      whiteSpace="pre"
      fontFamily="mono"
      borderRadius="lg"
      bg={bg}
      {...props}
    />
  );
};
