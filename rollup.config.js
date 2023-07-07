import fs from 'fs';
import { join, basename } from 'path';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { PROJECT_DIRECTORY_PATH } from './config.js';

const __dirname = PROJECT_DIRECTORY_PATH;

// Get component names
const componentsDir = join(__dirname, 'src', 'components');
const componentFiles = fs.readdirSync(componentsDir);
const componentNames = componentFiles.map(file => basename(file, '.ts'));

// Prepare input object for rollup
const input = {};
componentNames.forEach(name => {
  input[name] = join(componentsDir, `${name}.ts`);
});

export default {
  input,
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: '[name].js',
    chunkFileNames: 'shared/[name].js'
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfigOverride: { compilerOptions: { module: 'esnext' } },
    }),
  ],
};
