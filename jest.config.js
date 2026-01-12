/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testMatch: [
    '**/__tests__/**/*.(ts|tsx)',
    '**/?(*.)+(spec|test).(ts|tsx)',
  ],
};
