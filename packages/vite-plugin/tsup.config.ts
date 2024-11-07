import { defineConfig } from 'tsup';

export default defineConfig([
    {
        entry: ['src/index.ts'],
        splitting: true,
        target: 'esnext',
        outDir: 'lib',
        clean: true,
        dts: true,
        outExtension() {
            return {
                js: '.mjs',
            };
        },
    },
    {
        entry: ['src/index.ts'],
        target: 'es5',
        outDir: 'lib',
        splitting: true,
        clean: true,
        outExtension() {
            return {
                js: '.cjs',
            };
        },
    },
]);
