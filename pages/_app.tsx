import { useMemo } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Frame, AppSEO } from '~/components';
import { getTheme } from '~/util';

import type { AppProps } from 'next/app';

const App: React.FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;
  const theme = useMemo(getTheme, []);
  return (
    <>
      <AppSEO
        titleTemplate="%s | Stellar"
        defaultTitle="Tools | Stellar"
        openGraph={{
          title: 'Stellar Tools',
          type: 'website',
          images: [{ url: 'https://stellar.tech/opengraph.jpg' }],
        }}
      />
      <ChakraProvider theme={theme}>
        <Frame>
          <Component {...pageProps} />
        </Frame>
      </ChakraProvider>
    </>
  );
};

export default App;
