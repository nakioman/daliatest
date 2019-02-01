module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            enforce: 'pre',
            use: [
              {
                loader: 'tslint-loader',
                options: {
                  tsConfigFile: 'tsconfig.json',
                },
              },
            ],
          },
        ],
      },
    },
  },
};
