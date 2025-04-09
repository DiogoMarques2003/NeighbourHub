module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@handlers': './src/handlers',
          '@middlewares': './src/middlewares',
          '@errors': './src/errors',
          '@entities': './src/entities',
          '@providers': './src/providers',
          '@repositories': './src/repositories',
          '@useCases': './src/useCases',
          '@shared': './src/shared',
          '@constants': './src/constants',
          '@prismaClient': './src/prisma-client',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
