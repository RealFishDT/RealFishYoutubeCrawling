const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');
module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  mode: 'production',
  target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new DtsBundleWebpack({
      name: 'bundle',
      main: 'dist/debug/src/main.d.ts',
      out: '../../prod/bundle.d.ts',
      outputAsModuleFolder: true,
    }),
  ],
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '../dist/prod'),
  },
};
