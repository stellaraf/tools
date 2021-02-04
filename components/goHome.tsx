import NextLink from 'next/link';
import { IconButton, useColorModeValue } from '@chakra-ui/react';

import { FaHome as HomeIcon } from '@meronex/icons/fa';

export const GoHome: React.FC = () => {
  const color = useColorModeValue('red.500', 'red.300');
  return (
    <NextLink href="/">
      <IconButton color={color} variant="ghost" aria-label="Home" icon={<HomeIcon />} />
    </NextLink>
  );
};
