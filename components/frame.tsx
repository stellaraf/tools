import { Box, Flex, HStack } from '@chakra-ui/react';
import { ColorMode, GoHome } from '~/components';

import type { BoxProps } from '@chakra-ui/react';

const Footer: React.FC = (props: BoxProps) => {
  return (
    <Flex
      h={16}
      px={6}
      py={4}
      left={0}
      bottom={0}
      w="100%"
      pos="fixed"
      as="footer"
      justify="space-between"
      {...props}
    >
      <Box fontSize="xs" opacity={0.5}>
        {`Copyright © ${new Date().getFullYear()} Stellar Technologies Inc.`}
      </Box>
      <HStack>
        <GoHome />
        <ColorMode />
      </HStack>
    </Flex>
  );
};

export const Frame: React.FC<BoxProps> = (props: BoxProps) => {
  const { children, ...rest } = props;
  return (
    <>
      <Box
        as="main"
        top="50%"
        left="50%"
        minW="50%"
        position="fixed"
        transform="translate(-50%, -50%)"
        {...rest}
      >
        {children}
      </Box>
      <Footer>
        <GoHome />
        <ColorMode />
      </Footer>
    </>
  );
};
