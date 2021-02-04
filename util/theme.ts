import { extendTheme } from '@chakra-ui/react';
import { generatePalette } from 'palette-by-numbers';

import type { Theme } from '@chakra-ui/react';

export function getTheme(): Theme {
  const colors = {
    primary: generatePalette('#2915d6'),
    secondary: generatePalette('#9100fa'),
    accent: generatePalette('#50d8d7'),
  };
  return extendTheme({ colors });
}
