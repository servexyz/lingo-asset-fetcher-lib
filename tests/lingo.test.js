require("dotenv").config();
const log = console.log;
import test from "ava";
import path from "path";
import lingo from "Lingojs";
import {
  getRelevantAssetContainer,
  getKitId,
  getLingoSetupVariables,
  getAssetUuids,
  batchDownload,
  init
} from "../src/lingo.js";

import config from "../src/lingo.config";

const kitName = "Test Me";
const kitNameAccessor = "testMe";
const kitNameCS = "Capswan - Mobile App - Style Guide";
const kitNameAccessorCS = "capswan";

/*
 * **********************************
 * ./src/index.js
 * **********************************
 */
test.before(t => {
  let lsConfig = getLingoSetupVariables(
    process.env.SPACE_ID,
    process.env.API_TOKEN
  );
  lingo.setup(lsConfig[0], lsConfig[1]); //[0] => spaceId, [1] => apiToken
});

/*
TODO: Store results of each async call in global variables to avoid hitting API rate limit
* All of the skipped test *should* work. 
* They're skipped because each of the function calls is stacked. 
* Skipping prevents unnecssary API roundtrips and mitigates risk of hitting rate limit.
* Better solution would be to store return values of each stage globally and pass along.
*/
test(`getKitId :: ${kitNameCS}`, async t => {
  t.snapshot(await getKitId(kitNameCS));
});
test(`getRelevantAssetContainersTwo :: ${kitNameCS} - Target One`, async t => {
  var containers;
  try {
    let id = await getKitId(kitNameCS);
    let extractTarget = config[kitNameAccessorCS]["targetOne"];
    containers = await getRelevantAssetContainer(id, extractTarget);
    // log(`containers: ${JSON.stringify(containers, null, 2)}`);
  } catch (err) {
    log(`err: ${err}`);
  }
  t.truthy(containers);
});

test(`getRelevantAssetContainers :: ${kitNameCS} - Target Two`, async t => {
  let id = await getKitId(kitNameCS);
  let extractTarget = config[kitNameAccessorCS]["targetTwo"];
  let containers = await getRelevantAssetContainer(id, extractTarget);
  t.truthy(containers);
});

test.skip(`batchDownloads:: ${kitName} - Target One`, async t => {
  t.snapshot(
    await batchDownload(
      await getAssetUuids(
        await getRelevantAssetContainer(
          await getKitId(kitName),
          config[kitNameAccessor]["targetOne"]
        )
      )
    )
  );
});

test.skip(`batchDownloads :: ${kitName} - Target Two`, async t => {
  t.snapshot(
    await batchDownload(
      await getAssetUuids(
        await getRelevantAssetContainer(
          await getKitId(kitName),
          config[kitNameAccessor]["targetTwo"]
        )
      )
    )
  );
});

/*
 * **********************************
 * ./build/main.js
 * **********************************
 */
test.skip(`init :: ${kitName} - Target One`, t => {
  // log(
  // 	`Config: ${JSON.stringify(config[kitNameAccessor]["targetOne"], null, 2)}`
  // );

  t.truthy(
    init(
      kitName,
      config[kitNameAccessor]["targetOne"],
      "./downloads/testMeOne",
      "PNG"
    )
  );
});
test.skip(`init :: ${kitName} - Target Two`, t => {
  // log(
  // 	`Config: ${JSON.stringify(config[kitNameAccessor]["targetTwo"], null, 2)}`
  // );

  t.truthy(
    init(
      kitName,
      config[kitNameAccessor]["targetTwo"],
      "./downloads/testMeTwo",
      "PNG"
    )
  );
});

test(`Capswan :: targetOne`, async t => {
  let dir = path.join(__dirname, "../downloads/capswan/one");
  // log(`dir 1: ${dir}`);
  t.truthy(
    await init(
      "Capswan - Mobile App - Style Guide",
      config.capswan.targetOne,
      dir,
      "PNG"
    )
  );
});

test(`Capswan :: targetTwo`, async t => {
  let dir = path.join(__dirname, "../downloads/capswan/two");
  // log(`dir 2: ${dir}`);
  t.truthy(
    await init(
      "Capswan - Mobile App - Style Guide",
      config.capswan.targetTwo,
      dir,
      "PNG"
    )
  );
});
