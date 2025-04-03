export default {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
      "^@metaverse/db(.*)$": "<rootDir>/../packages/db/src$1"
    },
    extensionsToTreatAsEsm: [".ts"],
  };