module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules'],
    testMatch: [
        '<rootDir>/packages/components/**/__test__/**/*.[t|j]s?(x)',
        '<rootDir>/packages/vue3/**/__test__/**/*.[t|j]s?(x)',
    ],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '@snow-design/components(.*)$': '<rootDir>/packages/components/$1',
        '@snow-design/foundation(.*)$': '<rootDir>/packages/foundation/$1',
        '@snow-design/vue3(.*)$': '<rootDir>/packages/vue3/$1',
        '#test(.*)$': '<rootDir>/test/$1',
    },
    testEnvironmentOptions: {
        // 解决 Vue is not defined 问题 https://github.com/vuejs/vue-test-utils/issues/1975
        customExportConditions: ['node', 'node-addons'],
    },
    collectCoverageFrom: [
        'packages/components/**/*.{ts,tsx}',
        'packages/foundation/**/*.{ts,tsx}',
        '!packages/components/index.ts',
        '!packages/components/**/_story/*',
        '!packages/components/{lib,dist}/**/*',
        '!packages/foundation/{lib,dist}/**/*',
    ],
};
