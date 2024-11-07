import { defineConfig } from 'tsup';

export default defineConfig(() => {
    return [
        {
            entry: ['index.ts', 'en_US.ts', 'zh_CN.ts'],
            target: 'esnext',
            outDir: 'lib/es',
            splitting: true,
            clean: true,
            dts: true,
        },
        {
            entry: ['en_US.ts', 'zh_CN.ts'],
            target: 'es5',
            outDir: 'lib/cjs',
            splitting: true,
            clean: true,
        },
    ];
});
