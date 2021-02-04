import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { MdcLightbulbOn as LightOn, MdcLightbulbOutline as LightOff } from '@meronex/icons/mdc';

export const ColorMode: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue('yellow.500', 'yellow.300');
  return (
    <IconButton
      color={color}
      variant="ghost"
      onClick={toggleColorMode}
      aria-label="Toggle Color Mode"
      icon={colorMode === 'dark' ? <LightOff /> : <LightOn />}
    />
  );
};
