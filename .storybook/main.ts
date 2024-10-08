// import type { StorybookConfig } from '@storybook/react-vite';
// import { Configuration as WebpackConfig } from 'webpack';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/, // Add JSX and TSX file types
      exclude: /node_modules/, // Exclude node_modules
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              '@babel/preset-env', // Support for modern JS features
              '@babel/preset-react', // Support for React
              '@babel/preset-typescript', // If you're using TypeScript
            ],
          },
        },
      ],
    });

    config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx'); // Ensure Webpack resolves these extensions

    return config;
  },
  babel: async (options) => {
    // Add @babel/preset-react to ensure JSX works without React import for React 17+
    options.presets.push([
      '@babel/preset-react',
      {
        runtime: 'automatic', // This enables the automatic JSX runtime (React 17+)
      },
    ]);
    return options;
  },
};
export default config;
