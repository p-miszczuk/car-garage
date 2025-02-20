import type { Config } from "jest";
import "@testing-library/jest-dom";

const config: Config = {
  verbose: true,
  testRegex: ".helpers\\.test\\.ts?$",
};

// eslint-disable-next-line import/no-unused-modules
export default config;
