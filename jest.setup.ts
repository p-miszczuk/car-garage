import type { Config } from "jest";
import "@testing-library/jest-dom";

const config: Config = {
  verbose: true,
  testRegex: ".helpers\\.test\\.ts?$",
};

export default config;
