module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
    },
    moduleDirectories: ["node_modules"],
    testMatch: ['<rootDir>/packages/snow-ui/**/__test__/**/*.[t|j]s?(x)'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '@snow-design/snow-ui(.*)$': '<rootDir>/packages/snow-ui/$1',
        '@snow-design/snow-foundation(.*)$': '<rootDir>/packages/snow-foundation/$1',
    },
    // testEnvironmentOptions: {
    //     url: 'http://localhost',
    // },
    // setupFilesAfterEnv: ['<rootDir>/node_modules/jest-enzyme/lib/index.js'],
    // 运行测试前可运行的脚本，比如注册enzyme的兼容
    // setupFiles: ['<rootDir>/test/setup.js', 'jest-date-mock'],
    // snapshotSerializers: ['enzyme-to-json/serializer'],
    // 是否收集测试覆盖率
    //   collectCoverage: true, // 是否收集测试时的覆盖率信息
    // collectCoverageFrom: [
    //     'packages/semi-ui/**/*.{js,jsx,mjs,ts,tsx}',
    //     'packages/semi-foundation/**/*.{js,jsx,mjs,ts,tsx}',
    //     '!packages/semi-ui/scripts/**',
    //     '!packages/semi-ui/types/**',
    //     '!packages/semi-foundation/scripts/**',
    //     '!packages/**/__test__/**',
    //     '!packages/**/_story/**',
    //     "!packages/**/getBabelConfig.js",
    //     "!packages/**/gulpfile.js",
    //     "!packages/**/webpack.config.js",
    //     "!packages/semi-ui/index.ts",
    //     '!packages/**/_test_/**',
    //     '!packages/**/dist/**',
    //     '!packages/semi-ui/locale/**',
    // ], // 哪些文件需要收集覆盖率信息
    // coverageDirectory: '<rootDir>/test/coverage', // 输出覆盖信息文件的目录
    // coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/*/index.js'], // 统计覆盖信息时需要忽略的文件
}
