import { defineConfig } from 'tsup';

const basConfig = {
    entry: ['src/index.ts', 'src/snow-source-suffix-loader.ts', 'src/snow-theme-loader.ts'],
    clean: true,
    outExtension() {
        return {
            js: '.js',
            dts: '.ts',
        };
    },
};

export default defineConfig([
    {
        ...basConfig,
        format: 'esm',
        outDir: 'lib/es',
        splitting: false,
    },
    {
        ...basConfig,
        format: 'cjs',
        outDir: 'lib/cjs',
        dts: true,
    },
]);
