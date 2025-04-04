import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ["./src/pages/**"],
    rules: {
      "fsd/public-api": "off",
      "fsd/no-public-api-sidestep": "off",
      "fsd/no-segmentless-slices": "off",
    },
  },
  {
    // disable the `public-api` rule for files in the Shared layer
    files: ["./src/shared/**"],
    rules: {
      "fsd/public-api": "off",
      "fsd/no-public-api-sidestep": "off",
    },
  },
  {
    files: ["./src/app/auth.tsx"],
    rules: {
      "fsd/forbidden-imports": "off",
    },
  },
  {
    files: ["./src/**"],
    rules: {
      "fsd/insignificant-slice": "off",
    },
  },
]) as never; //ts-fix
