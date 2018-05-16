module.exports = {
    preset: 'react-native',
    setupTestFrameworkScriptFile: '<rootDir>/src/setup.js',
    globals: {
        __TEST__: true
    },
    // snapshotSerializers: [
    //     './node_modules/enzyme-to-json/serializer'
    // ],
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
    },
    collectCoverage: false,
    coveragePathIgnorePatterns: ['/node_modules/'],
    //coverageReporters: ['lcov'],
    //coverageDirectory: './coverage',
    // collectCoverageFrom: [
    //     '**/src/**/*.js',
    //     '!**/node_modules/**'
    // ],
    reporters: ['default', '<rootDir>/src/reporter/index.js']
};