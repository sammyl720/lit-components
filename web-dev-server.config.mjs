import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  nodeResolve: true,
  appIndex: 'demo/index.html',
  watch: true,
  open: true,
  plugins: [
    esbuildPlugin({ ts: true }),
  ],
};
