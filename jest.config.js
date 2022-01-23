require('source-map-support').install({
    environment: "node"
});

module.exports = {
  // [...]  
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
//   testEnvironment: 'jsdom',
//   extensionsToTreatAsEsm: ['.ts'],
//   globals: {
//     'ts-jest': {
//       useESM: true,
//     },
//   },
  moduleNameMapper: {
    // '^(\\.{1,2}/.*)\\.js$': '$1',
    '^mastodon/(.*)$': '<rootDir>/app/javascript/mastodon/$1',
  },
}