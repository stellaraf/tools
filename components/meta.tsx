import { DefaultSeo, NextSeo } from 'next-seo';

import type { NextSeoProps, DefaultSeoProps } from 'next-seo';

export const SEO: React.FC<NextSeoProps> = (props: NextSeoProps) => <NextSeo {...props} />;

export const AppSEO: React.FC<DefaultSeoProps> = (props: DefaultSeoProps) => (
  <DefaultSeo {...props} />
);
