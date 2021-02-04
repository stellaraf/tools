import NextLink from 'next/link';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { BsArrowRight as RightArrowIcon } from '@meronex/icons/bs';

const Index: React.FC = () => {
  return (
    <VStack spacing={8}>
      <VStack>
        <Heading>This is a random collection of one-off tools.</Heading>
        <Box fontSize="xs" opacity={0.5}>
          {`(which probably don't work)`}
        </Box>
      </VStack>
      <NextLink href="/mtu">
        <Button rightIcon={<RightArrowIcon />} colorScheme="blue">
          Juniper MTU Calculator
        </Button>
      </NextLink>
    </VStack>
  );
};

export default Index;
