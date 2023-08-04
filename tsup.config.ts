import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  metafile: true,
  outExtension: (ctx) => ({ js: `.${ctx.format}.js` }),
  sourcemap: true,
  splitting: false,
});
