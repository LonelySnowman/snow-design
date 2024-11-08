import { defineConfig } from 'tsup';

const baseConfig = {
    entry: ['index.ts', 'en_US.ts', 'zh_CN.ts'],
    clean: true,
    outExtension() {
        return {
            js: '.js',
            dts: '.ts',
        };
    },
};

export default defineConfig(() => {
    return [
        {
            ...baseConfig,
            format: 'esm',
            outDir: 'lib/es',
        },
        {
            ...baseConfig,
            format: 'cjs',
            outDir: 'lib/cjs',
            dts: true,
        },
    ];
});
