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
      ['module-resolver', {
        alias: {
          '@handlers': './src/handlers',
          '@errors': './src/errors',
          '@config': './src/config',
          '@entities': './src/entities',
          '@providers': './src/providers',
          '@repositories': './src/repositories',
          '@useCases': './src/useCases',
          "@shared": "./src/shared",
          '@constants': './src/constants',
          '@schemas': './src/schemas',
        },
      }],
    ],
    ignore: [
      '**/*.spec.ts',
    ],
};