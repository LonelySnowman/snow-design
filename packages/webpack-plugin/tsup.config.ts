import { defineConfig } from 'tsup';

export default defineConfig([
    {
        entry: ['src/index.ts', 'src/snow-source-suffix-loader.ts', 'src/snow-theme-loader.ts'],
        splitting: true,
        cjsInterop: true,
        target: 'esnext',
        outDir: 'lib/es',
        clean: true,
        dts: true,
    },
    {
        entry: ['src/index.ts', 'src/snow-source-suffix-loader.ts', 'src/snow-theme-loader.ts'],
        target: 'es5',
        outDir: 'lib/cjs',
        splitting: true,
        cjsInterop: true,
        clean: true,
    },
]);
