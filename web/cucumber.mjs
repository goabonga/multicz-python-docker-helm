// cucumber-js config (ESM, .mjs so we can use export default).
//
// `import` lists the TS modules cucumber needs to know about: step
// definitions and the support code (world + hooks).
//
// The `tsx/esm` loader is registered via NODE_OPTIONS in the
// `test:e2e` script (`--import tsx/esm`) — Node 20.6+ deprecated
// `--loader` so cucumber's own `loader:` field can't be used here.

export default {
  paths: ["e2e/features/**/*.feature"],
  import: ["e2e/steps/**/*.ts", "e2e/support/**/*.ts"],
  format: ["progress-bar", "summary"],
};
