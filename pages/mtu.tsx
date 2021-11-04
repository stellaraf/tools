import { useMemo, useState } from 'react';
import {
  Box,
  Input,
  Center,
  HStack,
  VStack,
  Heading,
  FormLabel,
  FormControl,
  useColorModeValue,
} from '@chakra-ui/react';
import { RadioField, NumberField, FieldContainer, CodeBlock, SEO } from '~/components';

type Families = 'ipv4' | 'ipv6' | 'dual';

const DEFAULT_MTU = 1500;
const DEFAULT_VLANS = 1;
const DEFAULT_MPLS = 3;

const Mtu: React.FC = () => {
  const [interfaceMtu, setInterfaceMtu] = useState<number>(DEFAULT_MTU);
  const [vlanTags, setVlanTags] = useState<number>(DEFAULT_VLANS);
  const [mplsLabels, setMplsLabels] = useState<number>(DEFAULT_MPLS);
  const [interfaceName, setInterfaceName] = useState<string>('ge-0/0/0.0');
  const [family, setFamily] = useState<Families>('dual');
  const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');

  const ipMtu = useMemo<number>(() => {
    if (interfaceMtu === 0) {
      return 0;
    }
    const multiplier: number = 14 + 4 * vlanTags;
    return interfaceMtu - multiplier;
  }, [interfaceMtu, vlanTags]);

  const mplsMtu = useMemo<number>(() => {
    if (interfaceMtu === 0) {
      return 0;
    }
    const vlanMultiplier: number = 14 + 4 * vlanTags;
    const mplsMultiplier: number = vlanMultiplier + 4 * mplsLabels;
    return interfaceMtu - mplsMultiplier;
  }, [interfaceMtu, vlanTags, mplsLabels]);

  const configs = useMemo<string>(() => {
    const ipv4 = `set interfaces ${interfaceName} family inet mtu ${ipMtu}`;
    const ipv6 = `set interfaces ${interfaceName} family inet6 mtu ${ipMtu}`;
    const mpls = `set interfaces ${interfaceName} family mpls mtu ${mplsMtu}`;
    switch (family) {
      case 'ipv4':
        return [ipv4, mpls].join('\n');
      case 'ipv6':
        return [ipv6, mpls].join('\n');
      case 'dual':
        return [ipv4, ipv6, mpls].join('\n');
    }
  }, [ipMtu, mplsMtu, interfaceName, family]);

  return (
    <>
      <SEO title="MTU Calculator" />
      <VStack boxSize="100%" spacing={8}>
        <VStack>
          <Heading>Juniper MTU Calculator</Heading>
          <Box fontSize="sm" opacity={0.8}>
            This is a work in progress, and might even be wrong.
          </Box>
        </VStack>
        <Center
          alignItems="flex-start"
          boxSize="100%"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="lg"
          pos="relative"
          flexDir="column"
        >
          <VStack boxSize="100%" spacing={8} align="flex-start" p={8}>
            <Heading>Payload</Heading>
            <NumberField
              slider
              step={100}
              title="MTU"
              max={11_000}
              value={interfaceMtu}
              defaultValue={DEFAULT_MTU}
              setValue={setInterfaceMtu}
            >
              <RadioField
                size="sm"
                value={interfaceMtu}
                setValue={setInterfaceMtu as React.ComponentProps<typeof RadioField>['setValue']}
                options={[1500, 9000, 9100, 9216].map(i => ({ value: i, label: i }))}
              />
            </NumberField>

            <FieldContainer title="VLAN Tags">
              <RadioField
                value={vlanTags}
                setValue={setVlanTags as React.ComponentProps<typeof RadioField>['setValue']}
                options={[0, 1, 2].map(i => ({ value: i, label: i }))}
              />
            </FieldContainer>

            <FieldContainer title="MPLS Labels">
              <RadioField
                value={mplsLabels}
                setValue={setMplsLabels as React.ComponentProps<typeof RadioField>['setValue']}
                options={[0, 1, 2, 3].map(i => ({ value: i, label: i }))}
              />
            </FieldContainer>
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
                {ipMtu}
              </Box>
              <Box fontSize="sm" fontWeight="thin">
                IPv4/IPv6 MTU
              </Box>
            </Center>
            <Box w="1px" h="100%" bg={borderColor} />
            <Center p={8} boxSize="100%" flexDir="column">
              <Box fontSize="xl" fontWeight="bold">
                {mplsMtu}
              </Box>
              <Box fontSize="sm" fontWeight="thin">
                MPLS MTU
              </Box>
            </Center>
          </Center>
        </Center>
        <Center
          p={8}
          boxSize="100%"
          pos="relative"
          flexDir="column"
          borderRadius="lg"
          border="1px solid"
          alignItems="flex-start"
          borderColor={borderColor}
        >
          <Heading mb={6}>Configuration</Heading>
          <VStack spacing={8} w="100%">
            <HStack w="100%" spacing={8} align="flex-start">
              <FormControl>
                <FormLabel>Interface</FormLabel>
                <Input
                  name="interfaceName"
                  value={interfaceName}
                  fontFamily="mono"
                  size="lg"
                  onChange={e => setInterfaceName(e.currentTarget.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address Family</FormLabel>
                <RadioField
                  value={family}
                  setValue={setFamily as React.ComponentProps<typeof RadioField>['setValue']}
                  options={[
                    { value: 'ipv4', label: 'IPv4' },
                    { value: 'ipv6', label: 'IPv6' },
                    { value: 'dual', label: 'Dual Stack' },
                  ]}
                />
              </FormControl>
            </HStack>
            <CodeBlock>{configs}</CodeBlock>
          </VStack>
        </Center>
      </VStack>
    </>
  );
};

export default Mtu;
