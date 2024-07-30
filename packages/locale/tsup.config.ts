import { defineConfig } from "tsup";

export default defineConfig(() => {
    return [
        {
            entry: ['index.ts', 'en_US.ts', 'zh_CN.ts'],
            target: 'esnext',
            outDir: 'lib/es',
            clean: true,
        },
        {
            entry: ['index.ts', 'en_US.ts', 'zh_CN.ts'],
            target: 'es5',
            outDir: 'lib/cjs',
            clean: true,
        }
    ]
})