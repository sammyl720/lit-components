import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
