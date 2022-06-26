const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset',
      },
      {
        test: /\.(FBX|fbx)/,
        type: 'asset',
      },
      {
        test: /\.(PDB|pdb)/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'three/OrbitControls': path.resolve(__dirname, './node_modules/three/examples/jsm/controls/OrbitControls.js'),
      'three/TrackballControls': path.resolve(
        __dirname,
        './node_modules/three/examples/jsm/controls/TrackballControls.js'
      ),
      'three/FBXLoader': path.resolve(__dirname, './node_modules/three/examples/jsm/loaders/FBXLoader.js'),
      'three/PDBLoader': path.resolve(__dirname, './node_modules/three/examples/jsm/loaders/PDBLoader.js'),
      'three/CSS2DRenderer': path.resolve(__dirname, './node_modules/three/examples/jsm/renderers/CSS2DRenderer.js'),
      'three/EffectComposer': path.resolve(
        __dirname,
        './node_modules/three/examples/jsm/postprocessing/EffectComposer.js'
      ),
      'three/RenderPass': path.resolve(__dirname, './node_modules/three/examples/jsm/postprocessing/RenderPass.js'),
      'three/ShaderPass': path.resolve(__dirname, './node_modules/three/examples/jsm/postprocessing/ShaderPass.js'),
      'three/OutlinePass': path.resolve(__dirname, './node_modules/three/examples/jsm/postprocessing/OutlinePass.js'),
      'three/FXAAShader': path.resolve(__dirname, './node_modules/three/examples/jsm/shaders/FXAAShader.js'),
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      scene: [path.resolve(__dirname, './src/global.js'), 'default'],
    }),
    new webpack.ProvidePlugin({
      THREE: 'three',
    }),
  ],
  devServer: {
    static: './dist',
    port: 9000,
  },
};
