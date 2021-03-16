import { useMemo, useState } from 'react';
import prettyBytes from 'pretty-bytes';
import { Box, Center, VStack, Heading, useColorModeValue } from '@chakra-ui/react';
import { RadioField, NumberField, SEO } from '~/components';

type Unit = 'Mbps' | 'Gbps';

const DEFAULT_CIR = 0;

const Burst: React.FC = () => {
  const [cirBits, setCirBits] = useState<number>(DEFAULT_CIR);
  const [cir, setCir] = useState<number>(DEFAULT_CIR);
  const [unit, setUnit] = useState<Unit>('Mbps');
  const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');

  function handleCirChange(value: number): void {
    if (cir !== value) {
      setCir(value);
    }

    if (unit === 'Mbps') {
      setCirBits(value * 1_000_000);
    } else if (unit === 'Gbps') {
      setCirBits(value * 1e9);
    }
  }
  function handleUnitChange(value: Unit) {
    setUnit(value);
    if (value === 'Mbps') {
      setCirBits(cir * 1_000_000);
    } else if (value === 'Gbps') {
      setCirBits(cir * 1e9);
    }
  }

  const burstSize = useMemo(() => {
    const value = ((cirBits / 1000) * 5) / 8;
    return prettyBytes(value).toUpperCase();
  }, [cir, cirBits, unit]);

  return (
    <>
      <SEO title="Burst Size Calculator" />
      <VStack boxSize="100%" spacing={8}>
        <VStack>
          <Heading>Burst Size Calculator</Heading>
          <Box fontSize="sm" opacity={0.8}>
            This is a work in progress, and might even be wrong.
          </Box>
        </VStack>
        <Center
          boxSize="100%"
          pos="relative"
          flexDir="column"
          borderRadius="lg"
          border="1px solid"
          alignItems="flex-start"
          borderColor={borderColor}
        >
          <VStack boxSize="100%" spacing={8} align="flex-start" p={8}>
            <NumberField
              slider
              step={1}
              title="CIR"
              max={999}
              value={cir}
              defaultValue={DEFAULT_CIR}
              setValue={handleCirChange}
            >
              <RadioField
                size="sm"
                value={unit}
                setValue={handleUnitChange as React.ComponentProps<typeof RadioField>['setValue']}
                options={['Mbps', 'Gbps'].map(i => ({ value: i, label: i }))}
              />
            </NumberField>
          </VStack>
          <Center
            h={16}
            width="100%"
            alignItems="center"
            borderTop="1px solid"
            justifyContent="space-between"
            borderTopColor={borderColor}
          >
            <Center p={8} boxSize="100%" flexDir="column">
              <Box fontSize="xl" fontWeight="bold">
                {burstSize}
              </Box>
              <Box fontSize="sm" fontWeight="thin">
                Burst Size
              </Box>
            </Center>
          </Center>
        </Center>
      </VStack>
    </>
  );
};

export default Burst;
