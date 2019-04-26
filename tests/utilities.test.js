import test from "ava";
// import { uGenerateLAFBoilerplate } from "../src/utilities";
import { uGenerateLAFBoilerplate } from "../src/index";

const log = console.log;

test(`uGenerateLAFBoilerplate - Empty Boilerplate`, t => {
  let x = uGenerateLAFBoilerplate(".laf.json", []);
  // log(`x: ${JSON.stringify(x, null, 2)}`);
  t.is(typeof x, "object");
});

test(`uGenerateLAFBoilerplate - Populated Boilerplate`, t => {
  let x = uGenerateLAFBoilerplate(".laf.json", ["a", "b", "c"]);
  // log(`x: ${JSON.stringify(x, null, 2)}`);
  t.is(typeof x, "object");
});
